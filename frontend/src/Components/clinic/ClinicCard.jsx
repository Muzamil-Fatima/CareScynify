import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarIcon from "@mui/icons-material/Star";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

const ClinicCard = ({ clinic, onView, onBook }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">

      {/* Image */}
      <div className="h-40 bg-gray-100">
        <img
          src={
            clinic?.image ||
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
          }
          alt="clinic"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">

        {/* Name + Rating */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">
            {clinic?.name || "Clinic Name"}
          </h2>

          <span className="flex items-center gap-1 text-sm text-yellow-500 font-medium">
            <StarIcon fontSize="small" />
            {clinic?.rating || 4.5}
          </span>
        </div>

        {/* Type */}
        <p className="text-sm text-gray-600">
          {clinic?.type || "General Clinic"}
        </p>

        {/* Location */}
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <LocationOnOutlinedIcon fontSize="small" />
          {clinic?.location || "City Center"}
        </p>

        {/* Services */}
        <p className="flex items-center gap-1 text-sm text-gray-600">
          <MedicalServicesOutlinedIcon fontSize="small" />
          {clinic?.services?.slice(0, 2).join(", ") ||
            "General Checkup, Emergency Care"}
        </p>

        {/* Status */}
        <p
          className={`text-xs font-medium ${
            clinic?.isOpen ? "text-green-600" : "text-red-500"
          }`}
        >
          {clinic?.isOpen ? "Open Now" : "Closed"}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">

          <button
            onClick={() => onView?.(clinic)}
            className="flex-1 border border-gray-300 text-sm py-2 rounded-lg hover:bg-gray-100 transition"
          >
            View Details
          </button>

          <button
            onClick={() => onBook?.(clinic)}
            className="flex-1 bg-purple-600 text-white text-sm py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Book
          </button>

        </div>
      </div>
    </div>
  );
};

export default ClinicCard;