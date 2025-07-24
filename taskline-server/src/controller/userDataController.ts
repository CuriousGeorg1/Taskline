//Controller for rquests handling user-specific data.

import { Router } from "express";
import { authenticated } from "../middleware/authMiddleware";
import { getUserLocations } from "../service/userDataService";
import { verifyToken } from "../service/jwtService";
import { GetTokenRequest } from "../types";

const userDataController = Router();

/**
 * Handles requests for fetching user-specific location data.
 * @remarks
 * It is primarily used to retrieve location data for the "/home" page.
 * @returns
 * - 200: Returns a JSON array of user locations on success.
 * - 500: Returns a JSON error message if fetching locations fails.
 */
userDataController.get("/locations", authenticated, async (req, res) => {
  try {
    const userId = (req.user as any).sub;

    // If no userId, bail
    if (!userId) {
      res.status(400).json({ message: "User not found." });
      return;
    }

    // Fetch user locations
    const locations = await getUserLocations(userId);
    res.status(200).json(locations);
  } catch (e) {
    console.log("Failed to fetch locations");
    res.status(500).json({ message: "Failed to fetch locations" });
  }
});

export default userDataController;
