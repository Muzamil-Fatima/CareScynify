import React, { useState } from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaBan,
  FaCalendarAlt,
} from "react-icons/fa";

const PharmacyStock = () => {
  // Mock Data: Is mein humne mukhtalif expiry dates rakhi hain test karne ke liye
  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      name: "Panadol 500mg",
      category: "Tablet",
      quantity: 120,
      expiry: "2026-12-15",
    }, // Safe (Green)
    {
      id: 2,
      name: "Amoxicillin Cap",
      category: "Capsule",
      quantity: 45,
      expiry: "2026-07-20",
    }, // Near Expiry (Yellow - Agle 1-2 mahine mein)
    {
      id: 3,
      name: "Lipitor 10mg",
      category: "Tablet",
      quantity: 80,
      expiry: "2026-05-10",
    }, // Expired (Red - Past Date)
    {
      id: 4,
      name: "Cough Syrup",
      category: "Syrup",
      quantity: 15,
      expiry: "2026-08-05",
    }, // Near Expiry (Yellow)
  ]);

  // Function: Expiry Status Aur Rang Check Karne Ke Liye
  const checkExpiryStatus = (expiryDateStr) => {
    const today = new Date();
    const expiryDate = new Date(expiryDateStr);

    // Dono dates ka darmiyan ka farq (milliseconds mein)
    const differenceInTime = expiryDate.getTime() - today.getTime();
    // Milliseconds ko dino (Days) mein convert karna
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays <= 0) {
      return {
        status: "Expired",
        color: "bg-red-50 text-red-600 border-red-200",
        icon: <FaBan className="text-red-500" />,
        badge: "bg-red-600 text-white",
      };
    } else if (differenceInDays <= 90) {
      return {
        status: "Near Expiry",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <FaExclamationTriangle className="text-amber-500" />,
        badge: "bg-amber-500 text-white",
      };
    } else {
      return {
        status: "Good/Active",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <FaCheckCircle className="text-emerald-500" />,
        badge: "bg-emerald-600 text-white",
      };
    }
  };

  // Near Expiry wali dawaiyon par automatic 30% discount lagane ka function (Advanced Feature)
  const applyNearExpiryDiscount = () => {
    alert(
      "Advanced Action: 30% Clearance Discount applied to all Near-Expiry stocks successfully!",
    );
  };

  return (
    <div className="p-8 bg-[#f8f9fe] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-950">
            Stock Intelligence
          </h1>
          <p className="text-gray-500 font-medium font-sans">
            Automated color-coded expiry tracking and risk management
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={applyNearExpiryDiscount}
          className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 border-none cursor-pointer"
        >
          <FaExclamationTriangle /> Apply Expiry Discount
        </button>
      </div>

      {/* Stock Cards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase">
              Expired Blocked
            </p>
            <h3 className="text-2xl font-black text-red-600 mt-1">1 Item</h3>
          </div>
          <span className="p-4 bg-red-50 rounded-2xl text-red-600">
            <FaBan size={20} />
          </span>
        </div>
        <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase">
              Near Expiry (90 Days)
            </p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">2 Items</h3>
          </div>
          <span className="p-4 bg-amber-50 rounded-2xl text-amber-500">
            <FaExclamationTriangle size={20} />
          </span>
        </div>
        <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase">
              Healthy Stock
            </p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">
              1 Item
            </h3>
          </div>
          <span className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
            <FaCheckCircle size={20} />
          </span>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="font-black text-blue-950 text-lg">
            Live Stock Status
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="p-4 pl-8 text-xs font-black text-gray-400 uppercase">
                  Medicine Name
                </th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase">
                  Category
                </th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase">
                  Quantity
                </th>
                <th className="p-4 text-xs font-black text-gray-400 uppercase">
                  Expiry Date
                </th>
                <th className="p-4 pr-8 text-center text-xs font-black text-gray-400 uppercase">
                  Intelligence Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stockItems.map((item) => {
                const health = checkExpiryStatus(item.expiry);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 pl-8 font-bold text-gray-800">
                      {item.name}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-700">
                      {item.quantity} units
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <FaCalendarAlt className="text-gray-400 text-xs" />{" "}
                        {item.expiry}
                      </div>
                    </td>
                    {/* Color Coded Status Column */}
                    <td className="p-4 pr-8 text-center">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border ${health.color}`}
                      >
                        {health.icon}
                        {health.status.toUpperCase()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PharmacyStock;