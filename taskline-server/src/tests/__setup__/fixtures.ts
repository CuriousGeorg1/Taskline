/**
 * Test Fixtures - Reusable test data
 */

export const mockUsers = {
  admin: {
    id: "admin-123",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin" as const,
    businessId: "business-123",
  },
  user: {
    id: "user-123",
    email: "user@example.com",
    name: "Regular User",
    role: "user" as const,
    businessId: "business-123",
  },
  owner: {
    id: "owner-123",
    email: "owner@example.com",
    name: "Business Owner",
    role: "owner" as const,
    businessId: "business-123",
  },
};

export const mockLocations = {
  location1: {
    id: "location-1",
    name: "Main Office",
    businessId: "business-123",
  },
  location2: {
    id: "location-2",
    name: "Branch Office",
    businessId: "business-123",
  },
};

export const mockBusiness = {
  id: "business-123",
  name: "Test Business Corp",
};

export const mockJournalEntries = {
  entry1: {
    locationId: "location-1",
    userId: "user-123",
    date: "2025-01-15",
    journalEntry: "Test journal entry",
    responsibleParty: "John Doe",
  },
  entry2: {
    locationId: "location-2",
    userId: "user-123",
    date: "2025-01-16",
    journalEntry: "Another test entry",
    responsibleParty: "Jane Smith",
  },
};
