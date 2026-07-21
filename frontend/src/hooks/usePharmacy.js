import { useContext } from "react";
import { PharmacyContext } from "../context/pharmacy/PharmacyContext";

export const usePharmacy = () => useContext(PharmacyContext);