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
  if (!verifyToken(token)) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
  next();
}
