import apiClient from "@/lib/apiClient";
import { UserLocation } from "../types";
import { getApiToken } from "./auth";
import { redirect } from "next/navigation";

// TODO : check types
export async function fetchUserLocations(user: any) {
  try {
    const response = await apiClient.post("/user-data", user);
    const locations: Array<UserLocation> = response.data;
    return locations;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch user locations");
  }
}
