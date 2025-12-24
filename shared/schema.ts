import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  visitedAt: timestamp("visited_at").defaultNow(),
});

export const insertVisitSchema = createInsertSchema(visits).omit({ id: true, visitedAt: true });

export type Visit = typeof visits.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
