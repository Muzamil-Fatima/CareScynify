import { createContext, useContext } from "react";

export const DoctorContext = createContext();

export const useDoctorContext = () => {
  return useContext(DoctorContext);
};