import apiClient from "@/lib/apiClient";
import { UserLocation } from "../types";
import { getApiToken } from "./auth";
import { redirect } from "next/navigation";

export async function fetchUserLocations(apiToken: string) {
  try {
    const res = apiClient.post("/user-data", { apiToken });
    return res;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch user locations");
  }
}
