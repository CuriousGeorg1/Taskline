import jwt from "jsonwebtoken";
import { GetTokenRequest, GetTokenResponse } from "../types";
import { sharedSecret } from "../config";

// A function that creates a jwt token
export async function createToken(
  getTokenRequest: GetTokenRequest
): Promise<GetTokenResponse> {
  const expiresIn = 3600;
  const apiToken = jwt.sign(
    {
      iss: "taskline",
      sub: getTokenRequest.id,
      upn: getTokenRequest.email,
      role: getTokenRequest.role,
    },
    sharedSecret,
    { expiresIn }
  );
  return { apiToken, expiresIn };
}

// A function that verifies the jwt token
export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, sharedSecret);
    return true;
  } catch (e) {
    return false;
  }
}
