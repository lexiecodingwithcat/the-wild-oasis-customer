"use server";
import { signIn, signOut } from "@/app/_lib/auth";

export async function signInAction() {
  // This function is meant to be used in the server component
  // It is used to sign in the user
  //   when user successfully sign in, they will be redirected to the account page
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
