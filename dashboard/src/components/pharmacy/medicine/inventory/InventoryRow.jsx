import React from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";

import MedicineBadges from "./MedicineBadges";
import InventoryActions from "./InventoryActions";

const InventoryRow = ({ medicine, onView, onEdit, onDelete, onRestock }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      {/* Medicine */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Image */}
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            {medicine?.image ? (
              <img
                src={medicine.image}
                alt={medicine.name}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <MedicationRoundedIcon />
            )}
          </div>

          {/* Name */}
          <div>
            <h3 className="font-semibold text-slate-800">
              {medicine?.name || "Paracetamol 500mg"}
            </h3>

            <p className="text-sm text-slate-500">
              SKU: {medicine?.sku || "MED-1001"}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-5">
        <span className="text-slate-700">{medicine?.category || "Tablet"}</span>
      </td>

      {/* Price */}
      <td className="px-6 py-5 font-medium text-slate-700">
        Rs. {medicine?.unitPrice || 120}
      </td>

      {/* Stock */}
      <td className="px-6 py-5">
        <span className="font-semibold text-slate-700">
          {medicine?.stock || 250}
        </span>
      </td>

      {/* Expiry */}
      <td className="px-6 py-5 text-slate-600">
        {medicine?.expiryDate || "12 Dec 2027"}
      </td>

      {/* Manufacturer */}
      <td className="px-6 py-5 text-slate-700">
        {medicine?.manufacturer || "ABC Pharma"}
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <MedicineBadges type={medicine?.status || "available"} />
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <InventoryActions
          medicine={medicine}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestock={onRestock}
        />
      </td>
    </tr>
  );
};

export default InventoryRow;
