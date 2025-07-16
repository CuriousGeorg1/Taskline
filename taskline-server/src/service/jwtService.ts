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
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, sharedSecret);
    console.log(decoded);
    return decoded;
  } catch (e) {
    return null;
  }
}
