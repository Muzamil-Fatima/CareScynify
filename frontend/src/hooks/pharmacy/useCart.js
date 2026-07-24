import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../api/pharmacy/cartApi";

export const useCart = () => {
  const [cart, setCart] = useState({
    items: [],
    totalAmount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Cart
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCart();

      setCart(
        data?.cart || {
          items: [],
          totalAmount: 0,
        },
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add Medicine
  const addMedicineToCart = useCallback(async (medicineId, quantity = 1) => {
    try {
      setLoading(true);
      setError("");

      const data = await addToCart({
        medicineId,
        quantity,
      });

      setCart(
        data?.cart || {
          items: [],
          totalAmount: 0,
        },
      );

      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add medicine.");

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update Quantity
  const updateQuantity = useCallback(
    async (medicineId, quantity) => {
      try {
        setError("");

        // instant UI update
        setCart((prev) => {
          const items = prev.items.map((item) => {
            const id = item?.medicineId?._id || item?.medicineId;

            if (id === medicineId) {
              return {
                ...item,
                quantity,
                subtotal: item.price * quantity,
              };
            }

            return item;
          });

          return {
            ...prev,
            items,
            totalAmount: items.reduce((sum, item) => sum + item.subtotal, 0),
          };
        });

        await updateCartItem(medicineId, quantity);
      } catch (err) {
        await fetchCart();

        setError(err?.response?.data?.message || "Failed to update quantity.");

        throw err;
      }
    },
    [fetchCart],
  );

  // Remove Item
  const removeFromCart = useCallback(
    async (medicineId) => {
      try {
        setCart((prev) => ({
          ...prev,

          items: prev.items.filter(
            (item) =>
              (item?.medicineId?._id || item?.medicineId) !== medicineId,
          ),
        }));

        await removeCartItem(medicineId);
      } catch (err) {
        await fetchCart();

        setError(err?.response?.data?.message || "Failed to remove item.");
      }
    },
    [fetchCart],
  );

  // Clear Cart
  const clearCartItems = useCallback(async () => {
    try {
      setCart({
        items: [],
        totalAmount: 0,
      });

      await clearCart();
    } catch (err) {
      await fetchCart();

      setError(err?.response?.data?.message || "Failed to clear cart.");
    }
  }, [fetchCart]);

  const cartItems = useMemo(() => cart?.items || [], [cart]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.subtotal, 0),
    [cartItems],
  );

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart,
    cartItems,

    cartCount,
    subtotal,

    loading,
    error,

    fetchCart,

    addMedicineToCart,

    updateQuantity,

    removeFromCart,

    clearCartItems,
  };
};
