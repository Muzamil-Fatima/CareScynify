import React, { useState } from "react";
import {
  FaShoppingCart,
  FaTrash,
  FaCheckCircle,
  FaBan,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PharmacySales = () => {
  // Mock Stock Data: Is mein humne dynamic checked items rakhe hain (Expiry aur Location ke sath)
  const [availableProducts] = useState([
    {
      id: 1,
      name: "Panadol 500mg",
      price: 60,
      quantity: 120,
      expiryStatus: "Good",
      location: "Rack A - Shelf 2",
    },
    {
      id: 2,
      name: "Amoxicillin Cap",
      price: 4200,
      quantity: 45,
      expiryStatus: "Near Expiry",
      location: "Rack B - Shelf 1",
    },
    {
      id: 3,
      name: "Lipitor 10mg",
      price: 1260,
      quantity: 80,
      expiryStatus: "Expired",
      location: "Rack C - Shelf 4",
    }, // Expired item
    {
      id: 4,
      name: "Cough Syrup",
      price: 350,
      quantity: 15,
      expiryStatus: "Near Expiry",
      location: "Rack B - Shelf 3",
    },
  ]);

  // Cart State
  const [cart, setCart] = useState([]);

  // Function: Add to Cart Logic (With Expiry Check)
  const addToCart = (product) => {
    // Advanced Safety Check: Agar item expired hai to agay jaane hi nahi dena
    if (product.expiryStatus === "Expired") {
      alert(
        `🚨 CRITICAL ERROR: ${product.name} is EXPIRED! Sales are strictly blocked for safety compliance.`,
      );
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, cartQty: item.cartQty + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, cartQty: 1 }]);
    }
  };

  // Remove item from Cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate Total Bill
  const totalBill = cart.reduce(
    (total, item) => total + item.price * item.cartQty,
    0,
  );

  return (
    <div className="p-8 bg-[#f8f9fe] min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-blue-950">Sales Point (POS)</h1>
        <p className="text-gray-500 font-medium">
          Real-time billing counter with automated patient safety blocking
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Available Medicines Counter */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-black text-blue-950 mb-2">
            Select Medicines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableProducts.map((product) => {
              const isExpired = product.expiryStatus === "Expired";
              return (
                <div
                  key={product.id}
                  className={`bg-white p-5 rounded-4xl border transition-all flex flex-col justify-between ${
                    isExpired
                      ? "border-red-200 bg-red-50/20 opacity-75 shadow-none"
                      : "border-gray-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Header: Name and Expiry Tag */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">
                        {product.name}
                      </h3>
                      {isExpired ? (
                        <span className="bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 uppercase">
                          <FaBan /> Blocked
                        </span>
                      ) : product.expiryStatus === "Near Expiry" ? (
                        <span className="bg-amber-500 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                          Near Expiry
                        </span>
                      ) : (
                        <span className="bg-emerald-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                          Safe
                        </span>
                      )}
                    </div>

                    {/* Shelf Location Tag */}
                    <div className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-[10px]" />{" "}
                      {product.location}
                    </div>

                    <p className="text-gray-400 text-xs mt-2">
                      Available Stock: {product.quantity} units
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-50">
                    <span className="text-xl font-black text-blue-950">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={isExpired}
                      className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border-none cursor-pointer transition-all ${
                        isExpired
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-950 text-white hover:bg-blue-900 shadow-lg shadow-blue-950/10"
                      }`}
                    >
                      <FaShoppingCart size={12} />{" "}
                      {isExpired ? "Expired" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Customer Digital Invoice/Cart */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit flex flex-col">
          <h3 className="font-black text-blue-950 text-xl border-b border-gray-50 pb-4 flex items-center gap-2">
            <FaShoppingCart className="text-blue-600" /> Active Basket
          </h3>

          {/* Cart Items List */}
          <div className="divide-y divide-gray-50 my-4 max-h-75 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="py-3 flex justify-between items-center gap-2"
              >
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Rs. {item.price} x {item.cartQty}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-blue-950 text-sm">
                    Rs. {(item.price * item.cartQty).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 bg-red-50 hover:bg-red-100 rounded-lg border-none cursor-pointer transition-colors"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="text-center py-12 text-gray-400 font-medium">
                No items in basket yet.
              </div>
            )}
          </div>

          {/* Total & Checkout Section */}
          <div className="border-t border-gray-100 pt-4 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">
                Grand Total:
              </span>
              <span className="text-3xl font-black text-emerald-600">
                Rs. {totalBill.toLocaleString()}
              </span>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() =>
                alert(
                  `🎉 Invoice Created! Total Collected: Rs. ${totalBill.toLocaleString()}`,
                )
              }
              className={`w-full p-4 rounded-xl font-bold transition-all shadow-lg text-center border-none ${
                cart.length === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10 cursor-pointer"
              }`}
            >
              Confirm & Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacySales;