import { createContext, useContext } from "react";

const GlobalSearchContext = createContext(null);

export const useGlobalSearchContext = () => {
  const context = useContext(GlobalSearchContext);

  if (!context) {
    throw new Error(
      "useGlobalSearchContext must be used inside GlobalSearchProvider",
    );
  }

  return context;
};

export default GlobalSearchContext;