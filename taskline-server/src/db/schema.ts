import { date } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("user_roles", ["admin", "user"]);

export const businessTable = pgTable("business", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const locationTable = pgTable("location", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  businessId: integer()
    .notNull()
    .references(() => businessTable.id),
});

// businessId and locationId default values are set to -1
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }),
  password: varchar(),

  businessId: integer()
    .default(-1)
    .references(() => businessTable.id),
  locationId: integer()
    .default(-1)
    .references(() => locationTable.id),

  role: rolesEnum().notNull(),
});

export const journalEntry = pgTable("journal_entry", {
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
