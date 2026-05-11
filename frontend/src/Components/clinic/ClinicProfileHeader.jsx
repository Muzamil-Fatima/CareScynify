import React from "react";
import StarIcon from "@mui/icons-material/Star";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";

const ClinicProfileHeader = ({ clinic, onBook }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      {/* Cover Image */}
      <div className="h-40 bg-linear-to-r from-purple-500 to-pink-500"></div>

      {/* Content */}
      <div className="p-5 relative">

        {/* Avatar */}
        <div className="absolute -top-10 left-5 w-20 h-20 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center text-purple-700 font-bold text-xl">
          {clinic?.name?.charAt(0) || "C"}
        </div>

        {/* Name + Verified */}
        <div className="ml-24">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {clinic?.name || "Clinic Name"}
            <VerifiedOutlinedIcon className="text-blue-500" fontSize="small" />
          </h1>

          <p className="text-sm text-gray-600">
            {clinic?.type || "General Clinic"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className="flex items-center text-yellow-500">
              <StarIcon fontSize="small" />
              {clinic?.rating || 4.5}
            </span>

            <span className="text-gray-500">
              ({clinic?.reviews || 120} reviews)
            </span>
          </div>

          {/* Location */}
          <p className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <LocationOnOutlinedIcon fontSize="small" />
            {clinic?.location || "City Center"}
          </p>

          {/* Status */}
          <p
            className={`text-xs font-medium mt-1 ${
              clinic?.isOpen ? "text-green-600" : "text-red-500"
            }`}
          >
            {clinic?.isOpen ? "Open Now" : "Closed"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4 ml-24">

          <button className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-100 transition">
            <LocalPhoneOutlinedIcon fontSize="small" />
            Call
          </button>

          <button
            onClick={() => onBook?.(clinic)}
            className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
          >
            Book Appointment
          </button>

          <button className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-100 transition">
            <DirectionsOutlinedIcon fontSize="small" />
            Directions
          </button>

        </div>
      </div>
    </div>
  );
};

export default ClinicProfileHeader;