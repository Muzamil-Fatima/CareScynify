import { useCallback, useState } from "react";

import {
  placeOrder,
  getMyOrders,
  getOrderById,
} from "../../api/pharmacy/orderApi";

export const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Place Order
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError("");

      const data = await placeOrder(orderData);

      return data;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to place order."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Logged-in Patient Orders
  const fetchMyOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyOrders();

      setOrders(data?.orders || []);

      return data;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch orders."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Single Order
  const fetchOrderById = useCallback(async (orderId) => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrderById(orderId);

      setOrder(data?.order || null);

      return data;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch order."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    order,

    loading,
    error,

    createOrder,
    fetchMyOrders,
    fetchOrderById,
  };
};