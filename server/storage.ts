import { db } from "./db";
import { visits, type Visit } from "@shared/schema";

export interface IStorage {
  recordVisit(): Promise<Visit>;
}

export class DatabaseStorage implements IStorage {
  async recordVisit(): Promise<Visit> {
    const [visit] = await db.insert(visits).values({}).returning();
    return visit;
  }
}

export const storage = new DatabaseStorage();
