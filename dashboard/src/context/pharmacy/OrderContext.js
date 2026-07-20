import { createContext, useContext } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export default OrderContext;