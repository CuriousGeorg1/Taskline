// Mock the entire database module before importing anything
jest.mock("../db", () => ({
  db: {
    select: jest.fn(),
  },
}));

// Mock the schema imports with proper structure
jest.mock("../db/schema", () => ({
  businessTable: {},
  journalEntry: {},
  usersTable: {},
  locationTable: {
    id: "locationTable.id",
    name: "locationTable.name",
  },
  userLocationTable: {
    userId: "userLocationTable.userId",
  },
}));

// Mock drizzle-orm functions
jest.mock("drizzle-orm", () => ({
  eq: jest.fn(),
  sql: jest.fn(),
}));

import { getUserLocations } from "../service/userDataService";

describe("getUserLocations", () => {
  // Mock the db module
  const mockDb = require("../db").db;

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user locations successfully", async () => {
    // Arrange
    const userId = "user-123";
    const mockLocations = [
      { id: "loc-1", name: "Location 1" },
      { id: "loc-2", name: "Location 2" },
    ];

    // Mock the entire query chain
    const mockInnerJoin = jest.fn().mockResolvedValue(mockLocations);
    const mockFrom = jest.fn().mockReturnValue({ innerJoin: mockInnerJoin });
    mockDb.select.mockReturnValue({ from: mockFrom });

    // Act
    const result = await getUserLocations(userId);

    // Assert
    expect(result).toEqual(mockLocations);
    expect(mockDb.select).toHaveBeenCalled();
  });

  it("should return empty array when user has no locations", async () => {
    // Arrange
    const userId = "user-456";
    const mockEmptyResult: any[] = [];

    // Mock the query chain to return empty array
    const mockInnerJoin = jest.fn().mockResolvedValue(mockEmptyResult);
    const mockFrom = jest.fn().mockReturnValue({ innerJoin: mockInnerJoin });
    mockDb.select.mockReturnValue({ from: mockFrom });

    // Act
    const result = await getUserLocations(userId);

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it("should handle database errors gracefully", async () => {
    // Arrange
    const userId = "user-789";
    const mockError = new Error("Database connection failed");

    // Mock the query to throw an error
    const mockInnerJoin = jest.fn().mockRejectedValue(mockError);
    const mockFrom = jest.fn().mockReturnValue({ innerJoin: mockInnerJoin });
    mockDb.select.mockReturnValue({ from: mockFrom });

    // Act & Assert
    await expect(getUserLocations(userId)).rejects.toThrow(
      "Database connection failed"
    );
  });

  it("should handle null or undefined userId", async () => {
    // Arrange
    const mockLocations: any[] = [];
    const mockInnerJoin = jest.fn().mockResolvedValue(mockLocations);
    const mockFrom = jest.fn().mockReturnValue({ innerJoin: mockInnerJoin });
    mockDb.select.mockReturnValue({ from: mockFrom });

    // Act & Assert for null
    const resultNull = await getUserLocations(null);
    expect(resultNull).toEqual([]);

    // Act & Assert for undefined
    const resultUndefined = await getUserLocations(undefined);
    expect(resultUndefined).toEqual([]);
  });

  it("should call select with correct field mapping", async () => {
    // Arrange
    const userId = "user-specific-id";
    const mockLocations = [{ id: "loc-1", name: "Test Location" }];

    const mockInnerJoin = jest.fn().mockResolvedValue(mockLocations);
    const mockFrom = jest.fn().mockReturnValue({ innerJoin: mockInnerJoin });
    mockDb.select.mockReturnValue({ from: mockFrom });

    // Act
    await getUserLocations(userId);

    // Assert
    expect(mockDb.select).toHaveBeenCalledTimes(1);
    // The select should be called with an object containing id and name fields
    const selectCall = mockDb.select.mock.calls[0][0];
    expect(selectCall).toHaveProperty("id");
    expect(selectCall).toHaveProperty("name");
  });
});
