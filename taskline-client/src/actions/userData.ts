"use server";

import apiClient from "@/lib/apiClient";
import { UserLocation } from "../types";
import { getApiToken } from "./auth";
import { redirect } from "next/navigation";

// TODO : check types
export async function fetchUserLocations() {
  try {
    const response = await apiClient.get("/user-data/locations");
    const locations: Array<UserLocation> = response.data;
    return locations;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch user locations");
  }
}

export async function createBusinessRequest(businessName: string) {
  console.log("Api call: ", businessName);

  try {
    const response = await apiClient.post("/users/create-business", {
      businessName,
    });
    // Retrurns status of request
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create business");
  }
}
