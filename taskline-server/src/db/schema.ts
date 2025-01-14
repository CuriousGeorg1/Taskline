import { date } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const businessTable = pgTable("business", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }),
});

export const locationTable = pgTable("location", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  businessId: integer()
    .notNull()
    .references(() => businessTable.id),
});

export const jourlanEntry = pgTable("journal_entry", {
  locationId: integer()
    .notNull()
    .references(() => locationTable.id),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  date: date().notNull(),
  journalEntry: varchar({ length: 255 }).notNull(),
  responsibleParty: varchar({ length: 255 }).notNull(),
});

export const Announcements = pgTable("announcements", {
  locationId: integer().references(() => locationTable.id),
  expirationDate: date().notNull(),
  entry: varchar({ length: 255 }).notNull(),
  startDate: date(),
});

export const photos = pgTable("photos", {
  locationID: integer().references(() => locationTable.id),
  photoURL: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
});
