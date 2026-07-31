import { createContext, useContext } from "react";

export const LabContext = createContext();

export const useLabContext = () => {
  return useContext(LabContext);
};