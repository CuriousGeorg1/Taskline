import { auth } from "@/authConfig";
import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

/*
Default axios instance with base URL set to the API URL.
*/
const apiClient = axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000",
});

/*
Request interceptor that adds the Authorization header with the API token from the session.
*/
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await auth();

    if (session?.apiToken) {
      config.headers.set("Authorization", `Bearer ${session.apiToken}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default apiClient;
