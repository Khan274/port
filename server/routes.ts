import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Simple endpoint to track visits (optional, just for completeness)
  app.post(api.visits.record.path, async (_req, res) => {
    const visit = await storage.recordVisit();
    res.status(201).json(visit);
  });

  return httpServer;
}
