import { createContext, useContext } from "react";

const MedicineContext = createContext();

export const useMedicine = () => {
  const context = useContext(MedicineContext);

  if (!context) {
    throw new Error("useMedicine must be used inside MedicineProvider");
  }

  return context;
};

export default MedicineContext;