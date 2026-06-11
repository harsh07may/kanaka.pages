import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  tags: text("tags").array().notNull().default([]),
  image: text("image").notNull().default(""),
  excerpt: text("excerpt").notNull().default(""),
  author: text("author").notNull().default(""),
  authorRole: text("author_role").notNull().default(""),
  authorBio: text("author_bio").notNull().default(""),
  authorImage: text("author_image"),
  color: text("color", { enum: ["yellow", "red", "blue"] })
    .notNull()
    .default("yellow"),
  content: text("content").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type PostRow = typeof posts.$inferSelect;
export type NewPostRow = typeof posts.$inferInsert;

export const heroContent = pgTable("hero_content", {
  key: text("key").primaryKey(),
  data: jsonb("data").notNull(),
});

export type HeroContentRow = typeof heroContent.$inferSelect;

export const subscribers = pgTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SubscriberRow = typeof subscribers.$inferSelect;
export type NewSubscriberRow = typeof subscribers.$inferInsert;
