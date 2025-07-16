import { Request, Response, NextFunction } from "express";
import { sharedSecret } from "../config";
import { verifyToken } from "../service/jwtService";

export async function hasSharedSecret(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientSecret = req.body.sharedSecret;
  if (clientSecret !== sharedSecret) {
    res.status(401).json({ message: "Unauthorized: Missing shared secret" });
    return;
  }
  next();
}

// Middleware to check if the request is authenticated
export async function authenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
    return;
  }
  // Check if token is valid

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
  req.user = decoded;
  next();
}
