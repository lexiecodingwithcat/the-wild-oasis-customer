import { getBooking, getCabin } from "@/app/_lib/data-service";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import SubmitButton from "@/app/_components/SubmitButton";

export default async function Page({ params }) {
  //get the bookingId
  const { reservationId } = await params;
  //get booking information based on reservationId
  const { numGuests, observations, cabinId } = await getBooking(reservationId);
  //get maxCapacity
  const { maxCapacity } = await getCabin(cabinId);
  // console.log(numGuests, observations);
  // CHANGE
  // const reservationId = 23;
  // const maxCapacity = 23;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <input name="reservationId" hidden value={reservationId} readOnly />
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
