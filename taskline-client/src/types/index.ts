export type CreateUserRequest = {
  name: string;
  email: string;
  profilePicture?: string | null;
  role: "user" | "owner";
  newBisinessName?: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "owner";
  newBusinessName?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type GetTokenRequest = {
  id: string;
  email: string;
  role: "user" | "admin" | "owner";
};

export type GetTokenResponse = {
  apiToken: string;
  expiresIn: number;
};

export type JournalEntry = {
  name: string;
  date: Date;
  journalEntry: string;
  responsibleParty: string;
  state: "completed" | "in-progress";
};

export type UserLocation = {
  id: string;
  name: string;
};
