export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
};

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
  role: string;
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
