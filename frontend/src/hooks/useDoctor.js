import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

export const useDoctor = () => {
  return useContext(DoctorContext);
};