/**
 * Global Jest mocks that apply to all tests
 * This file is loaded by Jest before any tests run
 */

// Mock the database module with more comprehensive mocking
jest.mock("../../db", () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock the complete schema
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
  Announcements: {
    locationId: "Announcements.locationId",
    expirationDate: "Announcements.expirationDate",
    entry: "Announcements.entry",
    startDate: "Announcements.startDate",
  },
  photos: {
    locationID: "photos.locationID",
    photoURL: "photos.photoURL",
    description: "photos.description",
  },
}));

// Mock all drizzle-orm functions
jest.mock("drizzle-orm", () => ({
  eq: jest.fn(),
  sql: jest.fn(),
  and: jest.fn(),
  or: jest.fn(),
  desc: jest.fn(),
  asc: jest.fn(),
  like: jest.fn(),
  ilike: jest.fn(),
  gt: jest.fn(),
  lt: jest.fn(),
  gte: jest.fn(),
  lte: jest.fn(),
  ne: jest.fn(),
  inArray: jest.fn(),
  notInArray: jest.fn(),
  isNull: jest.fn(),
  isNotNull: jest.fn(),
}));

// Mock JWT service functions
jest.mock("../../service/jwtService", () => ({
  verifyToken: jest.fn(),
  generateToken: jest.fn().mockReturnValue("mock-jwt-token"),
}));

// Mock bcrypt for password hashing
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed-password"),
  compare: jest.fn().mockResolvedValue(true),
  genSalt: jest.fn().mockResolvedValue("salt"),
}));

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
