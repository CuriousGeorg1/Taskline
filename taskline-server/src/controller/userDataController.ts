import { Router } from "express";
import { authenticated } from "../middleware/authMiddleware";
import { getUserLocations } from "../service/userDataService";
import { verifyToken } from "../service/jwtService";
import { GetTokenRequest } from "../types";

const userDataController = Router();

userDataController.get("/locations", async (req, res) => {
  const request = req.body as GetTokenRequest;

  try {
    const locations = await getUserLocations(req);
    res.status(200).json(locations);
  } catch (e) {
    console.log("Failed to fetch locations");
    res.status(500).json({ message: "Failed to fetch locations" });
  }
});

export default userDataController;
