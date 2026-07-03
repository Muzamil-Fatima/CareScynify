import React from "react";

const badgeStyles = {
  available: {
    text: "Available",
    className:
      "bg-green-100 text-green-700 border border-green-200",
  },

  "in-stock": {
    text: "In Stock",
    className:
      "bg-green-100 text-green-700 border border-green-200",
  },

  "low-stock": {
    text: "Low Stock",
    className:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",
  },

  "out-of-stock": {
    text: "Out of Stock",
    className:
      "bg-red-100 text-red-700 border border-red-200",
  },

  expired: {
    text: "Expired",
    className:
      "bg-red-100 text-red-700 border border-red-200",
  },

  "near-expiry": {
    text: "Near Expiry",
    className:
      "bg-orange-100 text-orange-700 border border-orange-200",
  },

  prescription: {
    text: "Prescription",
    className:
      "bg-purple-100 text-purple-700 border border-purple-200",
  },

  otc: {
    text: "OTC",
    className:
      "bg-sky-100 text-sky-700 border border-sky-200",
  },

  active: {
    text: "Active",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },

  inactive: {
    text: "Inactive",
    className:
      "bg-slate-100 text-slate-600 border border-slate-200",
  },
};

const MedicineBadges = ({ type = "available" }) => {
  const badge = badgeStyles[type] || badgeStyles.available;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
    >
      {badge.text}
    </span>
  );
};

export default MedicineBadges;