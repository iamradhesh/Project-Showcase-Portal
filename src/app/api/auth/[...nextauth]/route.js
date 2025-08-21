import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    async session({ session, token }) {
      // Add Google account ID to the session
      session.user.id = token.sub; // token.sub is Google's unique ID for the user
      return session;
    },
  },
});

export { handler as GET, handler as POST };
