import React from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const MedicineInfo = ({ medicine }) => {
  if (!medicine) return null;

  const {
    name,
    brand,
    genericName,
    strength,
    category,
    manufacturer,
    stock,
    unitPrice,
    expiryDate,
  } = medicine;

  const inStock = stock > 0;

  const formattedExpiry = expiryDate
    ? new Date(expiryDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <div className="flex flex-col gap-6">
      {/* Name */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

        {/* Reviews Placeholder */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((item) => (
              <StarRoundedIcon key={item} fontSize="small" />
            ))}
          </div>

          <span>(0 Reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div>
        <h2 className="text-4xl font-bold text-purple-700">
          Rs. {Number(unitPrice || 0).toLocaleString()}
        </h2>
      </div>

      {/* Stock */}
      <div>
        {inStock ? (
          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            ✔ In Stock ({stock} Available)
          </div>
        ) : (
          <div className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            ✖ Out of Stock
          </div>
        )}
      </div>

      {/* Information */}
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
        <InfoRow
          icon={<LocalOfferOutlinedIcon fontSize="small" />}
          label="Brand"
          value={brand || "-"}
        />

        <InfoRow
          icon={<MedicalServicesOutlinedIcon fontSize="small" />}
          label="Generic Name"
          value={genericName || "-"}
        />

        <InfoRow
          icon={<Inventory2OutlinedIcon fontSize="small" />}
          label="Strength"
          value={strength ? `${strength} mg` : "-"}
        />

        <InfoRow
          icon={<CategoryOutlinedIcon fontSize="small" />}
          label="Category"
          value={category || "-"}
        />

        <InfoRow
          icon={<ApartmentOutlinedIcon fontSize="small" />}
          label="Manufacturer"
          value={manufacturer || "-"}
        />

        <InfoRow
          icon={<EventOutlinedIcon fontSize="small" />}
          label="Expiry Date"
          value={formattedExpiry}
        />
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-none last:pb-0">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span>{label}</span>
    </div>

    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

export default MedicineInfo;