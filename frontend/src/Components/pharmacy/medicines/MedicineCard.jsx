import React from "react";
import { useNavigate } from "react-router-dom";

const MedicineCard = ({ medicine }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/medicine/${medicine._id}`);
  };

  return (
    <div onClick={handleCardClick} className="group cursor-pointer">
      {/* Image Card */}
      <div className="relative aspect-square rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-200">
      

        {/* Image */}
        <img
          src={
            medicine.images?.[0]?.url ||
            "https://via.placeholder.com/400x400?text=Medicine"
          }
          alt={medicine.name}
          loading="lazy"
          className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="mt-4 px-1">
        {/* Name */}
        <h2 className="text-[18px] font-semibold text-gray-800 leading-7 line-clamp-2 min-h-8">
          {medicine.name}

          {(medicine.strength || medicine.brand) && (
            <span >
              {" "}
              | {medicine.strength}
              {medicine.strength && medicine.brand && " • "}
              {medicine.brand}
            </span>
          )}
        </h2>

        {/* Price */}
        <div className=" flex items-center">
          <span className=" font-bold text-lime-600">
            Rs. {Number(medicine.unitPrice).toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
