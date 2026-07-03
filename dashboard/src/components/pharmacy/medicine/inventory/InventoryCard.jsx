import React from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";

import MedicineBadges from "./MedicineBadges";
import InventoryActions from "./InventoryActions";

const InventoryCard = ({
  medicine,
  onView,
  onEdit,
  onDelete,
  onRestock,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {/* Image */}
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            {medicine?.image ? (
              <img
                src={medicine.image}
                alt={medicine.name}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <MedicationRoundedIcon fontSize="large" />
            )}
          </div>

          {/* Name */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {medicine?.name || "Paracetamol 500mg"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              SKU: {medicine?.sku || "MED-1001"}
            </p>

            <div className="mt-3">
              <MedicineBadges
                type={medicine?.status || "available"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <CategoryRoundedIcon fontSize="small" />
            <span>Category</span>
          </div>

          <span className="font-medium text-slate-700">
            {medicine?.category || "Tablet"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <SellRoundedIcon fontSize="small" />
            <span>Price</span>
          </div>

          <span className="font-semibold text-blue-600">
            Rs. {medicine?.price || 120}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Inventory2RoundedIcon fontSize="small" />
            <span>Stock</span>
          </div>

          <span className="font-semibold text-slate-700">
            {medicine?.stock || 250}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarMonthRoundedIcon fontSize="small" />
            <span>Expiry</span>
          </div>

          <span className="text-slate-700">
            {medicine?.expiryDate || "12 Dec 2027"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <BusinessRoundedIcon fontSize="small" />
            <span>Manufacturer</span>
          </div>

          <span className="text-slate-700">
            {medicine?.manufacturer || "ABC Pharma"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-200"></div>

      {/* Actions */}
      <InventoryActions
        medicine={medicine}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onRestock={onRestock}
      />
    </div>
  );
};

export default InventoryCard;