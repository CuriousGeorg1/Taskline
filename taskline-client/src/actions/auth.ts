"use server";
import apiClient from "@/lib/apiClient";
import {
  LoginRequest,
  RegisterRequest,
  CreateUserRequest,
  GetTokenRequest,
} from "../types";

const sharedSecret = process.env.SHARED_SECRET;

/*
  This action calls the custom backend and authorizes a user
*/
export async function login(user: LoginRequest) {
  try {
    const res = await apiClient.post("/auth/login", user);
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to login user");
  }
}

/*
  This action is for the credentials provider and calls the custom backend to register a user
*/
export async function register(user: RegisterRequest) {
  try {
    const res = await apiClient.post("/auth/register", user);
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to register user");
  }
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
    const res = await apiClient.post<{ apiToken: string; expiresIn: number }>(
      "/auth/token",
      {
        sharedSecret,
        ...user,
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get api token");
  }
}
