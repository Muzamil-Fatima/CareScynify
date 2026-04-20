import { useContext } from "react";
import { HospitalContext } from "../context/hospital/HospitalContext";

export const useHospital = () => useContext(HospitalContext);