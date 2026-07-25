
import { createContext, useContext } from "react";

export const OrderContext = createContext(null);


export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderContext must be used inside OrderProvider"
    );
  }

  return context;
};