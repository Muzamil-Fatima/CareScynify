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
import { useOrderContext } from "../../context/pharmacy/OrderContext";
import toast from "react-hot-toast";
const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, subtotal } = useCartContext();
  const { createOrder, loading } = useOrderContext();
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

  const handlePlaceOrder = async () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!/^[0-9]{11}$/.test(formData.phone)) {
      toast.error("Please enter a valid 11-digit phone number.");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Please enter your delivery address.");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("Please enter your city.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    try {
      const response = await createOrder({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
      });

      toast.success("Order placed successfully.");
      navigate(`/order-success/${response.order._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order.");
    }
  };
  const isFormValid =
    formData.fullName.trim() &&
    /^[0-9]{11}$/.test(formData.phone) &&
    formData.address.trim() &&
    formData.city.trim() &&
    cartItems.length > 0;

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

          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

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
                <h2 className="text-xl font-semibold">Delivery Information</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">Full Name</label>

                  <div className="relative">
                    <PersonOutlineOutlinedIcon className="absolute left-3 top-3.5 text-gray-400" />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className=" border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full  border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Phone Number</label>

                  <div className="relative">
                    <PhoneOutlinedIcon className="absolute left-3 top-3.5 text-gray-400" />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className=" border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
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
                    className="  border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full  border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-medium">City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className=" border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full  border px-4 py-3 outline-none focus:border-purple-600"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-medium">Order Notes</label>

                <div className="relative">
                  <NoteAltOutlinedIcon className="absolute left-3 top-3.5 text-gray-400" />

                  <textarea
                    rows={4}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className=" border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full  border py-3 pl-11 pr-4 outline-none focus:border-purple-600"
                    placeholder="Optional..."
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <PaymentsOutlinedIcon className="text-purple-700!" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-purple-600 bg-purple-50 p-4">
                <input type="radio" checked readOnly />

                <span className="font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Right */}
          <div className="sticky top-24 h-fit overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/40">
            {/* Header */}
            <div className="border-b border-gray-100 bg-linear-to-r from-purple-50 via-white to-purple-50 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              <p className="mt-1 text-sm text-gray-500">
                Review your order before checkout
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-3 transition-all duration-300 hover:border-purple-200 hover:bg-white hover:shadow-md"
                  >
                    <img
                      src={item.medicineId?.images?.[0]?.url}
                      alt={item.medicineId?.medicineName}
                      className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold">
                        {item.medicineId?.medicineName}
                      </h4>

                      <p>Qty: {item.quantity}</p>
                    </div>

                    <div className="font-bold text-purple-700">
                      Rs. {item.subtotal}
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-dashed border-gray-200" />

              <div className="space-y-4 rounded-2xl bg-gray-50 p-5">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    Rs. {subtotal}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery</span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Free
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-purple-700">
                      Rs. {total}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!isFormValid || loading}
                className={`mt-8 w-full rounded-2xl py-3.5 text-base font-semibold text-white transition-all duration-300 ${
                  isFormValid
                    ? "bg-linear-to-r from-purple-600 to-indigo-600 hover:-translate-y-0.5 hover:from-purple-700 hover:to-indigo-700"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
