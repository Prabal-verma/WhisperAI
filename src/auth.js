import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),

  providers: [
    Google({
      // Ensure you have the correct client ID and secret from Google Cloud
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Specify the redirect URL
      redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" },
      },
      authorize: async (credentials) => {
        // Here you can implement the logic to verify credentials
        const user = await getUserFromDb(credentials.email, credentials.password); // Ensure this function is correctly implemented

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // Return user object to NextAuth
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Log the user in or handle errors
      if (account.provider === "google") {
        // Handle Google sign-in
        return true;
      }
      return true; // Allow sign-in for other providers
    },
    async session({ session, user }) {
      // Add user id to session
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user id to JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the desired URL after sign in
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/sign-in', // Custom sign-in page
    error: '/auth/error', // Error handling page
  },
});
