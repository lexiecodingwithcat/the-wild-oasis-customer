"use client";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  // two params: 1.actual state -- actual booking data 2. optimistic state -- the one we already delete the booking
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
