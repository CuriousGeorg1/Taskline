export type CreateUserRequest = {
  name: string;
  email: string;
  password?: string;
  profilePicture?: string | null;
  role: "user" | "admin" | "owner";
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "owner";
  newBusinessName?: string;
};

export type GetTokenRequest = {
  id: string;
  email: string;
  role: string;
};

export type GetTokenResponse = {
  apiToken: string;
  expiresIn: number;
};
