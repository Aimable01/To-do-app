import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password"),
});

enum customStatus {
  planned = "planned",
  assigned = "assigned",
  important = "important",
  completed = "completed",
}

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  createdAt: date("createdAt").defaultNow(),
  status: text("status").default(customStatus.planned),
});
