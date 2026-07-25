import { OrderContext } from "./OrderContext";

import { useOrders } from "../../hooks/pharmacy/useOrders";
import { useOrderDetails } from "../../hooks/pharmacy/useOrderDetails";

const OrderProvider = ({ children }) => {
  const orders = useOrders();
  const orderDetails = useOrderDetails();

  const value = {
    ...orders,
    ...orderDetails,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;