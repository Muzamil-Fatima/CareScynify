import { useContext } from "react";
import { PharmacyContext } from "../context/PharmacyContext";

export const usePharmacy = () => useContext(PharmacyContext);