import { useContext } from "react";
import { ClinicContext } from "../context/clinic/ClinicContext";

export const useClinic = () => useContext(ClinicContext);