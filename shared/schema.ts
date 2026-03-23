import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const siteConfig = pgTable("site_config", {
  id: varchar("id").primaryKey().default(sql`'default'`),
  siteName: text("site_name").notNull().default("SRPH MIS"),
  siteTagline: text("site_tagline").notNull().default("Employee Portal"),
  navItems: jsonb("nav_items").notNull().default(sql`'[]'::jsonb`),
  ctaButtonText: text("cta_button_text").notNull().default("IT Support"),
  ctaButtonLink: text("cta_button_link").notNull().default("/support"),
  heroTitle1: text("hero_title_1").notNull().default("Welcome to"),
  heroTitle2: text("hero_title_2").notNull().default("SRPH MIS Portal"),
  heroDescription: text("hero_description").notNull().default("Your one-stop access to all enterprise applications, tools, and resources."),
  heroPrimaryBtn: text("hero_primary_btn").notNull().default("Browse All Systems"),
  heroSecondaryBtn: text("hero_secondary_btn").notNull().default("IT Support"),
  stats: jsonb("stats").notNull().default(sql`'[]'::jsonb`),
  categories: jsonb("categories").notNull().default(sql`'[]'::jsonb`),
  footerCopyright: text("footer_copyright").notNull().default("© 2024 SRPH MIS. All rights reserved."),
  featuredCategories: jsonb("featured_categories").notNull().default(sql`'[]'::jsonb`),
  chatApiKey: text("chat_api_key").notNull().default(""),
  chatEndpoint: text("chat_endpoint").notNull().default("https://agent.sec.samsung.net/api/v1/run/d98b0949-3362-46b8-947a-16084bb3a710"),
  chatApiKey2: text("chat_api_key_2").notNull().default(""),
  chatEndpoint2: text("chat_endpoint_2").notNull().default(""),
  activeChatOption: text("active_chat_option").notNull().default("1"),
  pageContent: jsonb("page_content").notNull().default(sql`'{}'::jsonb`),
  logoUrl: text("logo_url").notNull().default(""),
  faviconUrl: text("favicon_url").notNull().default(""),
  websiteTitle: text("website_title").notNull().default("SRPH MIS Portal"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  path: text("path").notNull().unique(),
  name: text("name").notNull(),
  sections: jsonb("sections").notNull().default(sql`'[]'::jsonb`),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPageSchema = createInsertSchema(pages).pick({
  path: true,
  name: true,
  sections: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SiteConfig = typeof siteConfig.$inferSelect;
export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
