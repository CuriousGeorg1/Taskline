/**
 * Global test setup and utilities
 * This file contains common mocks and setup that can be reused across tests
 */

// Global mocks that are used across multiple test files
export const mockDb = {
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// Mock schema objects with consistent structure
export const mockSchema = {
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
};

// Common test utilities
export const createMockUser = (overrides = {}) => ({
  id: "user-123",
  email: "test@example.com",
  name: "Test User",
  role: "user",
  businessId: "business-123",
  ...overrides,
});

export const createMockLocation = (overrides = {}) => ({
  id: "location-123",
  name: "Test Location",
  businessId: "business-123",
  ...overrides,
});

// Reset all mocks - useful for beforeEach hooks
export const resetAllMocks = () => {
  jest.clearAllMocks();
  Object.values(mockDb).forEach((mock) => {
    if (jest.isMockFunction(mock)) {
      mock.mockReset();
    }
  });
};
