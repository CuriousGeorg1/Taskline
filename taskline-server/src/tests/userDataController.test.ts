import request from "supertest";
import express from "express";
import userDataController from "../controller/userDataController";
import { getUserLocations } from "../service/userDataService";
import { authenticated } from "../middleware/authMiddleware";

// Tests for userDataController.ts

// Mock the service and middleware
jest.mock("../service/userDataService");
jest.mock("../middleware/authMiddleware", () => ({
  authenticated: jest.fn((req, res, next) => {
    // Mock a user object on the request for successful authentication
    req.user = { sub: 1 };
    next();
  }),
}));

const mockedGetUserLocations = getUserLocations as jest.Mock;
const mockedAuthenticated = authenticated as jest.Mock;

const app = express();
app.use(express.json());
app.use("/", userDataController);

describe("GET /locations", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and user locations on success", async () => {
    const mockLocations = [
      { id: 1, name: "Location A" },
      { id: 2, name: "Location B" },
    ];
    mockedGetUserLocations.mockResolvedValue(mockLocations);

    const response = await request(app).get("/locations");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockLocations);
    expect(mockedGetUserLocations).toHaveBeenCalledWith(1); // Assuming user id 1 from mocked middleware
  });

  it("should return 200 and an empty array if user has no locations", async () => {
    mockedGetUserLocations.mockResolvedValue([]);

    const response = await request(app).get("/locations");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(mockedGetUserLocations).toHaveBeenCalledWith(1);
  });

  it("should return 500 if the service throws an error", async () => {
    mockedGetUserLocations.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/locations");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to fetch locations" });
  });

  it("should return 400 if user ID is not found on the request object", async () => {
    // Override the default mock for this specific test
    mockedAuthenticated.mockImplementationOnce((req, res, next) => {
      req.user = {}; // No 'sub' property
      next();
    });

    const response = await request(app).get("/locations");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "User not found." });
  });
});
