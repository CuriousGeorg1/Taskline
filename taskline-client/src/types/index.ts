export type CreateUserRequest = {
  name: string;
  email: string;
  profilePicture?: string | null;
  role: "user" | "admin";
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

export type GetTokenRequest = {
  id: string;
  email: string;
  role: "user" | "admin";
};

export type GetTokenResponse = {
  apiToken: string;
  expiresIn: number;
};

export type JournalEntry = {
  locationId: number;
  userId: string;
  date: Date;
  journalEntry: string;
  responsibleParty: string;
};
