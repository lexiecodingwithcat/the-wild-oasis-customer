import { ca, tr } from "date-fns/locale";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getGuest, createGuest } from "./data-service";
const authConfig = {
  providers: [Google()],
  // the authorized callback function is meant to determine whether a user has permission to access a specific webpage or resource
  callbacks: {
    authorized({ auth, request }) {
      //return any value to boolean
      return !!auth?.user;
    },
    // if the user has already in the DB, we do nothing
    //if there is no user, we create a new user
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    // get current guest id from db
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
