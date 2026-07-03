import { useContext } from "react";
import { PharmacyContext } from "../context/pharmacy/CartContext";

export const usePharmacy = () => useContext(PharmacyContext);