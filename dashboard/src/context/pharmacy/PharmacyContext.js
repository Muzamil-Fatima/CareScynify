import { createContext, useContext } from "react";

const PharmacyContext = createContext();

export const usePharmacy = () => useContext(PharmacyContext);

export default PharmacyContext;