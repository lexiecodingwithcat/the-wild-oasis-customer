import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [Google()],
  // the authorized callback function is meant to determine whether a user has permission to access a specific webpage or resource
  callbacks: {
    authorized({ auth, request }) {
      //return any value to boolean
      return !!auth?.user;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
