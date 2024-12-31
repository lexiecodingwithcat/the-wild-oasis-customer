"use server";
// by writing "user server", it become server actions, and all functions should be async
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

export async function signInAction() {
  // This function is meant to be used in the server component
  // It is used to sign in the user
  //   when user successfully sign in, they will be redirected to the account page
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// formData native API will return all form data
export async function updateGuest(formData) {
  //1.authentication and authroization
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  //2. we assume the data is unsafe so we have to validate
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    // the error will be caught automatically by closest error boundary
    throw new Error("Please provide a valid national ID");
  const updateData = { nationality, countryFlag, nationalID };
  // console.log(updateData);
  //update data in supabase
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated" + error.message);
  }
  //revalidate the data
  //all data under the route will be cleared and re-fetched
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  //1. check if user is authenticated
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");
  //2. check if user has the authority, users are onlt allowed to delete their own bookings
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking.");
  }
  //if logged, delete reservation
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error.message);
    throw new Error("Booking could not be deleted");
  }

  //update UI after the server action has finished
  revalidatePath("/account/reservation");
}
