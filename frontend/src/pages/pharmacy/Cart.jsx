import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CartItem from "../../Components/pharmacy/cart/CartItem";
import CartSummary from "../../Components/pharmacy/cart/CartSummary";
import { useCartContext } from "../../context/pharmacy/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, subtotal, updateQuantity, removeFromCart } =
    useCartContext();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/medicine"
              className="mb-3 inline-flex items-center gap-2 text-purple-700 hover:underline"
            >
              <ArrowBackRoundedIcon fontSize="small" />
              Go back to Medicines
            </Link>

            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <ShoppingCartOutlinedIcon sx={{ fontSize: 34 }} />
              Item's Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {cartItems.length} item(s) in your cart
            </p>
          </div>
        </div>

        {/* Empty Cart */}

        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white py-24 text-center shadow-sm">
            <ShoppingCartOutlinedIcon
              sx={{ fontSize: 90 }}
              className="text-gray-300!"
            />

            <h2 className="mt-6 text-2xl font-bold text-gray-700">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added any medicines yet.
            </p>

            <Link
              to="/pharmacy"
              className="mt-8 inline-flex rounded-xl bg-purple-700 px-8 py-3 font-semibold text-white transition hover:bg-purple-800"
            >
              Browse Medicines
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left */}

            <div className="space-y-5 lg:col-span-2">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onIncrease={() =>
                    updateQuantity(
                      item.medicineId?._id || item._id,
                      item.quantity + 1,
                    )
                  }
                  onDecrease={() =>
                    updateQuantity(
                      item.medicineId?._id || item._id,
                      Math.max(1, item.quantity - 1),
                    )
                  }
                  onRemove={() =>
                    removeFromCart(item.medicineId?._id || item._id)
                  }
                />
              ))}
            </div>

            {/* Right */}

            <div className="sticky top-24 h-fit overflow-hidden rounded-2xl bg-white shadow-sm">
              <CartSummary
                subtotal={subtotal}
                deliveryFee={0}
                discount={0}
                onCheckout={() => navigate("/checkout")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
