import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    apiToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    apiToken?: string | null;
    apiTokenExpiry?: number | null;
  }
}
