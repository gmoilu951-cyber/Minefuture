import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "MOCK",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MOCK",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "MOCK",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "MOCK",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
