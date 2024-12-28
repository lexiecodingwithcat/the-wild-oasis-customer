"use client";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const reservationContext = createContext();
const initialState = { from: undefined, to: undefined };
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  function resetRange() {
    setRange(initialState);
  }
  return (
    <reservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </reservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(reservationContext);
  if (context === undefined)
    throw new Error("context was used outside provider");
  return context;
}
export { ReservationProvider, useReservation };
