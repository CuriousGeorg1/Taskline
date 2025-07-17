/**
 * Global Jest mocks
 * This file contains Jest mocks that should be hoisted and applied globally
 */

// Mock the entire database module
jest.mock("../../db", () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock the schema imports with proper structure that matches the real schema
jest.mock("../../db/schema", () => ({
  businessTable: {
    id: "businessTable.id",
    name: "businessTable.name",
  },
  journalEntry: {
    id: "journalEntry.id",
    locationId: "journalEntry.locationId",
    userId: "journalEntry.userId",
    date: "journalEntry.date",
    journalEntry: "journalEntry.journalEntry",
    responsibleParty: "journalEntry.responsibleParty",
  },
  usersTable: {
    id: "usersTable.id",
    email: "usersTable.email",
    name: "usersTable.name",
    password: "usersTable.password",
    businessId: "usersTable.businessId",
    role: "usersTable.role",
  },
  locationTable: {
    id: "locationTable.id",
    name: "locationTable.name",
    businessId: "locationTable.businessId",
  },
  userLocationTable: {
    userId: "userLocationTable.userId",
    locationId: "userLocationTable.locationId",
  },
}));

// Mock drizzle-orm functions
jest.mock("drizzle-orm", () => ({
  eq: jest.fn(),
  sql: jest.fn(),
  and: jest.fn(),
  or: jest.fn(),
  desc: jest.fn(),
  asc: jest.fn(),
}));

// Mock JWT service
jest.mock("../../service/jwtService", () => ({
  verifyToken: jest.fn(),
  generateToken: jest.fn(),
}));
