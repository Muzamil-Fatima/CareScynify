import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { useCartContext } from "../../context/pharmacy/CartContext";
const Checkout = () => {
  const navigate = useNavigate();

 const {
  cartItems,
  subtotal,
} = useCartContext();



  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    console.log(formData);
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="mb-4 inline-flex items-center gap-2 text-purple-700 hover:underline"
          >
            <ArrowBackRoundedIcon fontSize="small" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your delivery information.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:col-span-2">

            {/* Delivery Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">
                <LocalShippingOutlinedIcon className="text-purple-700!" />
                <h2 className="text-xl font-semibold">
                  Delivery Information
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-medium">
                    Full Name
                  </label>

                  <div className="relative">
                    <PersonOutlineOutlinedIcon className="absolute left-3 top-3.5 text-gray-400" />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Phone Number
                  </label>

                  <div className="relative">
                    <PhoneOutlinedIcon className="absolute left-3 top-3.5 text-gray-400" />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

              </div>

              <div className="mt-5">
                <label className="mb-2 block font-medium">
                  Delivery Address
                </label>

                <div className="relative">
                  <HomeOutlinedIcon className="absolute left-3 top-3.5 text-gray-400" />

                  <textarea
                    rows={4}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-purple-600"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-medium">
                  Order Notes
                </label>

                <div className="relative">
                  <NoteAltOutlinedIcon className="absolute left-3 top-3.5 text-gray-400" />

                  <textarea
                    rows={4}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
                    placeholder="Optional..."
                  />
                </div>
              </div>

            </div>

            {/* Payment */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">
                <PaymentsOutlinedIcon className="text-purple-700!" />
                <h2 className="text-xl font-semibold">
                  Payment Method
                </h2>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-purple-600 bg-purple-50 p-4">
                <input
                  type="radio"
                  checked
                  readOnly
                />

                <span className="font-medium">
                  Cash on Delivery
                </span>
              </label>

            </div>

          </div>

          {/* Right */}
          <div className="sticky top-24 h-fit rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-semibold">
              Order Summary
            </h2>

            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3"
                >
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg border object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-medium">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">
                    Rs. {item.unitPrice * item.quantity}
                  </div>
                </div>
              ))}

            </div>

            <div className="my-6 border-t" />

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-purple-700">
                  Rs. {total}
                </span>
              </div>

            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-xl bg-purple-700 py-3 font-semibold text-white transition hover:bg-purple-800"
            >
              Place Order
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;