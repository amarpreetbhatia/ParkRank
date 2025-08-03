import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVoteSchema } from "@shared/schema";
import { calculateELO } from "../client/src/lib/elo";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get random matchup
  app.get("/api/matchup", async (req, res) => {
    try {
      const matchup = await storage.getRandomMatchup();
      if (!matchup) {
        return res.status(404).json({ message: "No parks available for matchup" });
      }
      res.json({ parks: matchup });
    } catch (error) {
      console.error("Error getting matchup:", error);
      res.status(500).json({ message: "Failed to get matchup" });
    }
  });

  // Submit vote
  app.post("/api/vote", async (req, res) => {
    try {
      const { winnerId, loserId } = req.body;
      
      if (!winnerId || !loserId || winnerId === loserId) {
        return res.status(400).json({ message: "Invalid winner or loser ID" });
      }

      const winner = await storage.getParkById(winnerId);
      const loser = await storage.getParkById(loserId);

      if (!winner || !loser) {
        return res.status(404).json({ message: "Park not found" });
      }

      // Calculate new ELO ratings
      const { winnerRating, loserRating } = calculateELO(winner.eloRating, loser.eloRating);
      const ratingChange = winnerRating - winner.eloRating;

      // Create vote record
      const vote = await storage.createVote({
        winnerId,
        loserId,
        winnerPreviousRating: winner.eloRating,
        loserPreviousRating: loser.eloRating,
        winnerNewRating: winnerRating,
        loserNewRating: loserRating,
        ratingChange,
      });

      // Update park ratings
      await storage.updateParkRating(winnerId, winnerRating, true);
      await storage.updateParkRating(loserId, loserRating, false);

      res.json({ 
        vote, 
        newRatings: { 
          winner: winnerRating, 
          loser: loserRating 
        } 
      });
    } catch (error) {
      console.error("Error submitting vote:", error);
      res.status(500).json({ message: "Failed to submit vote" });
    }
  });

  // Get rankings
  app.get("/api/rankings", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const rankings = await storage.getRankings(limit);
      res.json({ rankings });
    } catch (error) {
      console.error("Error getting rankings:", error);
      res.status(500).json({ message: "Failed to get rankings" });
    }
  });

  // Get recent votes
  app.get("/api/recent-votes", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const recentVotes = await storage.getRecentVotes(limit);
      res.json({ votes: recentVotes });
    } catch (error) {
      console.error("Error getting recent votes:", error);
      res.status(500).json({ message: "Failed to get recent votes" });
    }
  });

  // Get statistics
  app.get("/api/statistics", async (req, res) => {
    try {
      const totalVotes = await storage.getVoteCount();
      const todayVotes = await storage.getTodayVoteCount();
      const allParks = await storage.getAllParks();
      const totalParks = allParks.length;
      
      // Find most contested park (most total votes)
      const mostContested = allParks.reduce((prev, current) => 
        (prev.totalVotes > current.totalVotes) ? prev : current
      );

      res.json({
        totalVotes,
        todayVotes,
        totalParks,
        mostContested: mostContested.name,
      });
    } catch (error) {
      console.error("Error getting statistics:", error);
      res.status(500).json({ message: "Failed to get statistics" });
    }
  });

  // Initialize parks data
  app.post("/api/initialize-parks", async (req, res) => {
    try {
      const existingParks = await storage.getAllParks();
      if (existingParks.length > 0) {
        return res.json({ message: "Parks already initialized", count: existingParks.length });
      }

      const { initializeParksData } = await import("../client/src/lib/parks-data");
      const parksData = initializeParksData();
      
      const createdParks = [];
      for (const parkData of parksData) {
        const park = await storage.createPark(parkData);
        createdParks.push(park);
      }

      res.json({ message: "Parks initialized successfully", count: createdParks.length });
    } catch (error) {
      console.error("Error initializing parks:", error);
      res.status(500).json({ message: "Failed to initialize parks" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
