import { api } from "../axios";

// Place Order
export const placeOrder = async (orderData) => {
  const res = await api.post("/api/pharmacy/orders/place", orderData);

  return res.data;
};

// Get Logged-in Patient Orders
export const getMyOrders = async () => {
  const res = await api.get("/api/pharmacy/orders/my-orders");

  return res.data;
};

// Get Single Order
export const getOrderById = async (orderId) => {
  const res = await api.get(`/api/pharmacy/orders/${orderId}`);
  return res.data;
};
