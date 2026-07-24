import { api } from "../axios";

// Get Logged-in Patient Cart
export const getCart = async () => {
  const res = await api.get("/api/cart");
  return res.data;
};

// Add Medicine to Cart
export const addToCart = async ({ medicineId, quantity }) => {
  const res = await api.post("/api/cart/add", {
    medicineId,
    quantity,
  });

  return res.data;
};

// Update Quantity
export const updateCartItem = async (medicineId, quantity) => {
  const res = await api.put(`/api/cart/update/${medicineId}`, {
    quantity,
  });

  return res.data;
};

// Remove Medicine
export const removeCartItem = async (medicineId) => {
  const res = await api.delete(`/api/cart/remove/${medicineId}`);
  return res.data;
};

// Clear Cart
export const clearCart = async () => {
  const res = await api.delete("/api/cart/clear");
  return res.data;
};
