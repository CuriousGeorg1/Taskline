/**
 * Test Helpers - Reusable test utilities and builders
 */

// Database query chain builder for mocking
export class MockQueryBuilder {
  private mockResult: any;

  constructor(result: any) {
    this.mockResult = result;
  }

  static withResult(result: any) {
    return new MockQueryBuilder(result);
  }

  build() {
    const mockInnerJoin = jest.fn().mockResolvedValue(this.mockResult);
    const mockWhere = jest.fn().mockResolvedValue(this.mockResult);
    const mockFrom = jest.fn().mockReturnValue({
      innerJoin: mockInnerJoin,
      where: mockWhere,
    });
    const mockSelect = jest.fn().mockReturnValue({ from: mockFrom });

    return {
      select: mockSelect,
      from: mockFrom,
      innerJoin: mockInnerJoin,
      where: mockWhere,
    };
  }
}

// Error builders
export const createDatabaseError = (message = "Database error") =>
  new Error(message);

export const createNotFoundError = (resource = "Resource") =>
  new Error(`${resource} not found`);

// Mock request/response builders for controller tests
export const createMockRequest = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  user: { sub: "user-123" }, // Default authenticated user
  ...overrides,
});

export const createMockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
  };
  return res;
};

export const createMockNext = () => jest.fn();

// Async helper to wait for promises to resolve
export const waitForPromises = () => new Promise(setImmediate);

// Date utilities for consistent test dates
export const testDates = {
  today: "2025-01-17",
  yesterday: "2025-01-16",
  tomorrow: "2025-01-18",
};

// Reset all mocks utility
export const resetAllMocks = () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
};
