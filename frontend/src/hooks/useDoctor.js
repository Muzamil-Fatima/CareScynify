import { useContext } from "react";
import { DoctorContext } from "../context/doctor/DoctorContext";

export const useDoctor = () => {
  return useContext(DoctorContext);
};