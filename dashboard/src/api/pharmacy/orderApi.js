import { api } from "../axios";

// Get Pharmacy Orders
export const getPharmacyOrders = async () => {
  const res = await api.get("/api/pharmacy/orders/pharmacy-orders");

  return res.data;
};

// Update Order Status
export const updateOrderStatus = async (orderId, orderStatus) => {
  const res = await api.put(`/api/pharmacy/orders/${orderId}/status`, {
    orderStatus,
  });

  return res.data;
};

// Get Pharmacy Order Detail
export const getPharmacyOrderById = async (orderId) => {
  const res = await api.get(`/api/pharmacy/orders/${orderId}`);

  return res.data;
};
