import React from "react";
import { OrderContext } from "./OrderContext";
import { useOrder } from "../../hooks/pharmacy/useOrders";


const OrderProvider = ({ children }) => {

  const order = useOrder();


  return (
    <OrderContext.Provider value={order}>
      {children}
    </OrderContext.Provider>
  );

};


export default OrderProvider;