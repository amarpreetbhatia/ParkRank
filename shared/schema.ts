import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const parks = pgTable("parks", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  coordinates: text("coordinates"),
  establishedDate: text("established_date"),
  description: text("description"),
  eloRating: integer("elo_rating").notNull().default(1500),
  totalVotes: integer("total_votes").notNull().default(0),
  wins: integer("wins").notNull().default(0),
  losses: integer("losses").notNull().default(0),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const votes = pgTable("votes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  winnerId: varchar("winner_id").notNull().references(() => parks.id),
  loserId: varchar("loser_id").notNull().references(() => parks.id),
  winnerPreviousRating: integer("winner_previous_rating").notNull(),
  loserPreviousRating: integer("loser_previous_rating").notNull(),
  winnerNewRating: integer("winner_new_rating").notNull(),
  loserNewRating: integer("loser_new_rating").notNull(),
  ratingChange: integer("rating_change").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const parksRelations = relations(parks, ({ many }) => ({
  votesAsWinner: many(votes, { relationName: "winner" }),
  votesAsLoser: many(votes, { relationName: "loser" }),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  winner: one(parks, {
    fields: [votes.winnerId],
    references: [parks.id],
    relationName: "winner",
  }),
  loser: one(parks, {
    fields: [votes.loserId],
    references: [parks.id],
    relationName: "loser",
  }),
}));

export const insertParkSchema = createInsertSchema(parks).omit({
  createdAt: true,
});

export const insertVoteSchema = createInsertSchema(votes).omit({
  id: true,
  createdAt: true,
});

export type InsertPark = z.infer<typeof insertParkSchema>;
export type Park = typeof parks.$inferSelect;
export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
