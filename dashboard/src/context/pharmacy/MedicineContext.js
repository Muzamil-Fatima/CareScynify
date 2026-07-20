import { createContext, useContext } from "react";

const MedicineContext = createContext();

export const useMedicine = () => useContext(MedicineContext);

export default MedicineContext;