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
    const medicineId = getMedicineId(item);
    await updateQuantity(medicineId, item.quantity + 1);
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;

    const medicineId = getMedicineId(item);
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
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between bg-white/90 px-6 py-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-violet-700 shadow-lg shadow-purple-300/40">
                <ShoppingCartOutlinedIcon className="text-white!" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Shopping Cart
                </h2>

                <p className="text-sm text-gray-500">
                  {cartItems.length} Items
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-gray-100 p-2.5 transition-all duration-200 hover:scale-105 hover:bg-gray-200"
            >
              <CloseRoundedIcon />
            </button>
          </div>

          {/* Scroll Area */}
          <div className="flex-1 overflow-y-auto bg-linear-to-b from-gray-50 via-white to-white">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6">
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
              <>
                {/* Cart Items */}
                <div className="space-y-5 px-6 py-6">
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

                {/* Footer (scrolls with content) */}
                <div className="mt-2 rounded-t-3xl bg-white px-6 pb-8 pt-6 shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
                  <CartSummary
                    subtotal={subtotal}
                    deliveryFee={0}
                    discount={0}
                  />

                  <div className="mt-5 space-y-3">
                    <Link
                      to="/cart"
                      onClick={onClose}
                      className="block w-full rounded-2xl bg-purple-50 py-3.5 text-center font-semibold text-purple-700 transition-all duration-200 hover:bg-purple-100 hover:shadow-md"
                    >
                      View Cart
                    </Link>

                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className="block w-full rounded-2xl bg-linear-to-r from-purple-600 to-violet-700 py-3.5 text-center font-semibold text-white shadow-lg shadow-purple-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-400/40"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;