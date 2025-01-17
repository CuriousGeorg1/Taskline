"use server";
import apiClient from "@/lib/apiClient";
import { LoginRequest, RegisterRequest, CreateUserRequest, GetTokenRequest } from "../types";

const apiUrl = process.env.API_URL || "http://localhost:4000";
const sharedSecret = process.env.SHARED_SECRET;

/*
  This action calls the custom backend and authorizes a user
*/
export async function login(user: RegisterRequest) {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

/*
  This action is for the credentials provider and calls the custom backend to register a user
*/
export async function register(user: LoginRequest) {
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
}

/* 
  This action calls the custom backend and creates a user.
  The custom backend creates the user in the db if not already present.
*/
export async function createUser(user: CreateUserRequest) {
  try {
    await apiClient.post("/users", user);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/*
  This action fetches an apiToken to be used to authorize actions to the custom backend
  This uses the shared secret to authorize the request
  This function is called after a user is authenticated
*/
export async function getApiToken(user: GetTokenRequest) {
  try {
    const res = await apiClient.post<{ token: string }>("/auth/token", {
      sharedSecret,
      ...user,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
