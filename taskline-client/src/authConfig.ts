import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { createUser, getApiToken, login, register } from "./actions/auth";
import { GetTokenRequest } from "./types";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      mode: { label: "Mode", type: "text" },
    },
    /*
      This function is for the credentials provider and it uses custom backend to authorize the user
    */
    async authorize(c) {
      const { email, password, mode } = c as {
        email: string;
        password: string;
        mode: "signup" | "signin";
      };

      if (mode === "signup") {
        const user = await register({ email, password });
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
      const payload: GetTokenRequest = {
        id: user.id as string,
        email: user.email as string,
        roles: ["user"],
      };

      const apiToken = await getApiToken(payload);
      return { ...token, apiToken };
    },
    async session({ session, token }) {
      session.apiToken = token.apiToken as string;
      return session;
    },
  },
});
