import { useContext } from "react";
import { ClinicContext } from "../context/ClinicContext";

export const useClinic = () => useContext(ClinicContext);