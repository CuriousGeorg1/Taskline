import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { createUser, getApiToken, login, register } from "./actions/auth";

const providers: Provider[] = [
  Credentials({
    credentials: {
      name: { label: "Name", type: "text" },
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      mode: { label: "Mode", type: "text" },
    },
    /*
      This function is for the credentials provider and it uses custom backend to authorize the user
    */
    async authorize(c) {
      const { name, email, password, mode } = c as {
        name: string;
        email: string;
        password: string;
        mode: "signup" | "signin";
      };

      if (mode === "signup") {
        const user = await register({ name, email, password });
        return user;
      } else {
        const user = await login({ email, password });
        return user;
      }
    },
  }),
  GitHub,
  Google,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/login",
  },
  /*
    This callback is called every time a user signs in
    For providers other than credentials, it creates a user in the custom backend
  */
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      const payload = {
        id: user.id as string,
        email: user.email as string,
        profilePicture: user.image,
      };

      return await createUser(payload);
    },
    /*
      Fetches an apiToken to be used to authorize actions to the custom backend
      Attach the apiToken to the jwt and session
    */
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = "role"; // Change this to the role of the user. Role will be set in signIn callback

        const { apiToken, expiresIn } = await getApiToken({
          id: user.id as string,
          email: user.email as string,
          role: "user",
        });

        token.apiToken = apiToken;
        token.apiTokenExpiry = Date.now() + expiresIn * 1000;
      }

      // Near apiTokenExpiry, it will be refreshed
      const now = Date.now();
      const shouldRefreshTime = 60 * 1000;
      if (
        token.apiTokenExpiry &&
        now + shouldRefreshTime >= token.apiTokenExpiry
      ) {
        try {
          const { apiToken, expiresIn } = await getApiToken({
            id: token.id as string,
            email: token.email as string,
            role: token.role as string,
          });
          token.apiToken = apiToken;
          token.apiTokenExpiry = Date.now() + expiresIn * 1000;
        } catch (error) {
          console.error("Failed to refresh token:", error);
          await signOut();
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.apiToken = token.apiToken as string;
      return session;
    },
  },
});
