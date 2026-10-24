import { createContext, useContext } from "react";

const DirectSaleContext = createContext();

export const useDirectSale = () => {
  const context = useContext(DirectSaleContext);

  if (!context) {
    throw new Error("useDirectSale must be used inside DirectSaleProvider");
  }

  return context;
};

export default DirectSaleContext;