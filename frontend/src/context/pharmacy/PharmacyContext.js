import { createContext, useContext } from "react";

export const PharmacyContext = createContext();

export const usePharmacyContext = () => {
  return useContext(PharmacyContext);
};