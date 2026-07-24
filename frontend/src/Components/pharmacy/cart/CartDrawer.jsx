import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

import { useCartContext } from "../../../context/pharmacy/CartContext.js";

import CartItem from "./CartItem.jsx";
import CartSummary from "./CartSummary.jsx";

const CartDrawer = ({ open = false, onClose = () => {} }) => {
  const { cartItems, subtotal, updateQuantity, removeFromCart, fetchCart } =
    useCartContext();

  if (!open) return null;

  const getMedicineId = (item) => {
    return item?.medicineId?._id || item?.medicineId;
  };

  const handleIncrease = async (item) => {
    const medicineId = item?.medicineId?._id || item?.medicineId;

    await updateQuantity(medicineId, item.quantity + 1);
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;

    const medicineId = item?.medicineId?._id || item?.medicineId;

    await updateQuantity(medicineId, item.quantity - 1);
  };

  const handleRemove = async (item) => {
    try {
      const medicineId = getMedicineId(item);

      await removeFromCart(medicineId);

      await fetchCart();
    } catch (error) {
      console.error("Remove cart item error:", error);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-100 p-2">
              <ShoppingCartOutlinedIcon className="text-purple-700!" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>

              <p className="text-sm text-gray-500">{cartItems.length} Items</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <ShoppingCartOutlinedIcon
                className="text-gray-300!"
                sx={{ fontSize: 90 }}
              />

              <h3 className="mt-5 text-xl font-semibold text-gray-700">
                Your Cart is Empty
              </h3>

              <p className="mt-2 text-center text-gray-500">
                Add medicines to start shopping.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onIncrease={() => handleIncrease(item)}
                  onDecrease={() => handleDecrease(item)}
                  onRemove={() => handleRemove(item)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}

        {cartItems.length > 0 && (
          <div className="border-t bg-white p-5">
            <CartSummary subtotal={subtotal} deliveryFee={0} discount={0} />

            <div className="space-y-3">
              <Link
                to="/cart"
                className="block w-full rounded-xl border border-purple-700 py-3 text-center font-semibold text-purple-700 transition hover:bg-purple-50"
              >
                View Cart
              </Link>

              <Link
                to="/checkout"
                className="block w-full rounded-xl bg-purple-700 py-3 text-center font-semibold text-white transition hover:bg-purple-800"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
