import { createContext, useContext } from "react";

export const LabTestContext = createContext();

export const useTestContext = () => {
  return useContext(LabTestContext);
};