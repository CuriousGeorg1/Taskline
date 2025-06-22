/**
 * This file defines the database schema using Drizzle ORM.
 * It includes tables for users, businesses, locations, journal entries,
 * announcements, and photos.
 *
 * The schema uses PostgreSQL types and includes relationships between tables.
 */

import { date } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar, pgEnum, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

// Enums for schema
export const rolesEnum = pgEnum("user_roles", ["admin", "user", "owner"]);
export const entryStateEnum = pgEnum("entry_state", [
  "completed",
  "in-progress",
]);

export const businessTable = pgTable("business", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export const locationTable = pgTable("location", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  businessId: integer()
    .notNull()
    .references(() => businessTable.id),
  ...timestamps,
});

// businessId and locationId default values are set to -1
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar(),

  businessId: integer()
    .default(-1)
    .references(() => businessTable.id),
  // locationId: integer()
  //   .default(-1)
  //   .references(() => locationTable.id),
  role: rolesEnum().notNull(),
  ...timestamps,
});

export const userLocationTable = pgTable("user_locations", {
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  locationId: integer()
    .notNull()
    .references(() => locationTable.id),
});

export const journalEntry = pgTable("journal_entry", {
  locationId: integer()
    .notNull()
    .references(() => locationTable.id),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  date: date().notNull(),
  journalEntry: text().notNull(),
  responsibleParty: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export const Announcements = pgTable("announcements", {
  locationId: integer().references(() => locationTable.id),
  expirationDate: date().notNull(),
  entry: text().notNull(),
  startDate: date(),
  ...timestamps,
});

export const photos = pgTable("photos", {
  locationID: integer().references(() => locationTable.id),
  photoURL: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ...timestamps,
});
