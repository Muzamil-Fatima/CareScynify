import { useContext } from "react";
import { HospitalContext } from "../context/HospitalContext";

export const useHospital = () => useContext(HospitalContext);