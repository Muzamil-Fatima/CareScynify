import React from "react";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useNavigate } from "react-router-dom";

const MedicineCard = ({ medicine }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden">
      {/* Medicine Image */}
      <div className="h-52 bg-gray-100 flex items-center justify-center">
        <img
          src={medicine.images?.[0]?.url}
          alt={medicine.name}
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
          {medicine.category}
        </span>

        {/* Medicine Name */}
        <h2 className="mt-3 text-lg font-semibold text-gray-800 line-clamp-1">
          {medicine.name}
        </h2>

        {/* Generic Name */}
        <p className="text-sm text-gray-500">
          {medicine.genericName || "Generic name not available"}
        </p>

        {/* Manufacturer */}
        <p className="text-sm text-gray-600 mt-2">
          {medicine.manufacturer}
        </p>

        {/* Pharmacy */}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <LocalPharmacyOutlinedIcon fontSize="small" />
          <span>{medicine.pharmacy?.pharmacyName || "Pharmacy"}</span>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 mt-2 text-sm">
          <Inventory2OutlinedIcon fontSize="small" />
          <span
            className={
              medicine.stock > 0 ? "text-green-600" : "text-red-600"
            }
          >
            {medicine.stock > 0
              ? `${medicine.stock} in stock`
              : "Out of Stock"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-700">
            Rs. {medicine.unitPrice}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => navigate(`/medicine/${medicine._id}`)}
            className="flex-1 flex items-center justify-center gap-2 border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50"
          >
            <VisibilityOutlinedIcon fontSize="small" />
            Details
          </button>

          <button
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            <ShoppingCartOutlinedIcon fontSize="small" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;