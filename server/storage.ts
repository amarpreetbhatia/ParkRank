import { type Park, type InsertPark, type Vote, type InsertVote, parks, votes, type User, type InsertUser, users } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, not, or } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Parks
  getAllParks(): Promise<Park[]>;
  getParkById(id: string): Promise<Park | undefined>;
  createPark(park: InsertPark): Promise<Park>;
  updateParkRating(id: string, newRating: number, isWin: boolean): Promise<void>;
  getRandomMatchup(excludeRecent?: boolean): Promise<[Park, Park] | null>;
  
  // Votes
  createVote(vote: InsertVote): Promise<Vote>;
  getRecentVotes(limit?: number): Promise<(Vote & { winner: Park; loser: Park })[]>;
  getVoteCount(): Promise<number>;
  getTodayVoteCount(): Promise<number>;
  
  // Rankings
  getRankings(limit?: number): Promise<Park[]>;
  getParkRankingHistory(parkId: string): Promise<{ date: Date; rating: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllParks(): Promise<Park[]> {
    return await db.select().from(parks).orderBy(desc(parks.eloRating));
  }

  async getParkById(id: string): Promise<Park | undefined> {
    const [park] = await db.select().from(parks).where(eq(parks.id, id));
    return park || undefined;
  }

  async createPark(park: InsertPark): Promise<Park> {
    const [newPark] = await db
      .insert(parks)
      .values(park)
      .returning();
    return newPark;
  }

  async updateParkRating(id: string, newRating: number, isWin: boolean): Promise<void> {
    await db
      .update(parks)
      .set({
        eloRating: newRating,
        totalVotes: sql`${parks.totalVotes} + 1`,
        wins: isWin ? sql`${parks.wins} + 1` : parks.wins,
        losses: !isWin ? sql`${parks.losses} + 1` : parks.losses,
      })
      .where(eq(parks.id, id));
  }

  async getRandomMatchup(excludeRecent: boolean = true): Promise<[Park, Park] | null> {
    const allParks = await db.select().from(parks);
    
    if (allParks.length < 2) {
      return null;
    }

    // Simple random selection for now - could be enhanced to avoid recent matchups
    const shuffled = allParks.sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1]];
  }

  async createVote(vote: InsertVote): Promise<Vote> {
    const [newVote] = await db
      .insert(votes)
      .values(vote)
      .returning();
    return newVote;
  }

  async getRecentVotes(limit: number = 10): Promise<(Vote & { winner: Park; loser: Park })[]> {
    const result = await db
      .select({
        id: votes.id,
        winnerId: votes.winnerId,
        loserId: votes.loserId,
        winnerPreviousRating: votes.winnerPreviousRating,
        loserPreviousRating: votes.loserPreviousRating,
        winnerNewRating: votes.winnerNewRating,
        loserNewRating: votes.loserNewRating,
        ratingChange: votes.ratingChange,
        createdAt: votes.createdAt,
        winner: {
          id: parks.id,
          name: parks.name,
          state: parks.state,
          coordinates: parks.coordinates,
          establishedDate: parks.establishedDate,
          description: parks.description,
          eloRating: parks.eloRating,
          totalVotes: parks.totalVotes,
          wins: parks.wins,
          losses: parks.losses,
          imageUrl: parks.imageUrl,
          createdAt: parks.createdAt,
        },
      })
      .from(votes)
      .innerJoin(parks, eq(votes.winnerId, parks.id))
      .orderBy(desc(votes.createdAt))
      .limit(limit);

    // Get loser data separately
    const votesWithWinners = result;
    const enrichedVotes = [];

    for (const vote of votesWithWinners) {
      const [loser] = await db.select().from(parks).where(eq(parks.id, vote.loserId));
      enrichedVotes.push({
        ...vote,
        loser,
      });
    }

    return enrichedVotes as (Vote & { winner: Park; loser: Park })[];
  }

  async getVoteCount(): Promise<number> {
    const [result] = await db.select({ count: sql<number>`count(*)` }).from(votes);
    return result.count;
  }

  async getTodayVoteCount(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(votes)
      .where(sql`${votes.createdAt} >= ${today}`);
    
    return result.count;
  }

  async getRankings(limit?: number): Promise<Park[]> {
    const query = db.select().from(parks).orderBy(desc(parks.eloRating));
    
    if (limit) {
      return await query.limit(limit);
    }
    
    return await query;
  }

  async getParkRankingHistory(parkId: string): Promise<{ date: Date; rating: number }[]> {
    // For now, return empty array - could be enhanced to track historical ratings
    return [];
  }
}

export const storage = new DatabaseStorage();
