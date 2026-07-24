import React from "react";
import { Link } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";

const OrderSuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircleRoundedIcon
            className="text-green-600!"
            sx={{ fontSize: 60 }}
          />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Placed!
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for your order. Your medicines have been successfully
          ordered.
        </p>

        {/* Order Info */}
        <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold">#ORD123456</span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span className="font-semibold text-green-600">Confirmed</span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-gray-500">Delivery</span>
            <span className="font-semibold">2-3 Days</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <Link
            to="/orders"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3 font-semibold text-white hover:bg-purple-800"
          >
            <ShoppingBagOutlinedIcon />
            View My Orders
          </Link>

          <Link
            to="/pharmacy"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-700 py-3 font-semibold text-purple-700 hover:bg-purple-50"
          >
            <LocalPharmacyOutlinedIcon />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;