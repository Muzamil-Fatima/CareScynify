import { createContext, useContext } from "react";

export const SymptomContext = createContext();

export const useSymptom = () => {
  const context = useContext(SymptomContext);

  if (!context) {
    throw new Error(
      "useSymptom must be used within a SymptomProvider"
    );
  }

  return context;
};