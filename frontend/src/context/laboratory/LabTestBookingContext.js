import { createContext, useContext } from "react";

export const LabTestBookingContext = createContext();

export const useLabTestBookingContext = () => {
  return useContext(LabTestBookingContext);
};