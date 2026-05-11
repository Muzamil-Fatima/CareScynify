import React from "react";
import StarIcon from "@mui/icons-material/Star";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

const DoctorCard = ({ doctor, onViewProfile, onBook }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col md:flex-row gap-4">
      
      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">
          {doctor?.name?.charAt(0) || "D"}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1">
        
        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-800">
          {doctor?.name || "Doctor Name"}
        </h2>

        {/* Specialty */}
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <LocalHospitalOutlinedIcon fontSize="small" />
          {doctor?.specialty || "Specialist"}
        </p>

        {/* Rating + Experience */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1 text-yellow-500">
            <StarIcon fontSize="small" />
            {doctor?.rating || "4.5"}
          </span>

          <span>{doctor?.experience || "10+ years experience"}</span>
        </div>

        {/* Fee */}
        <p className="text-sm font-medium text-purple-700">
          Fee: Rs. {doctor?.fee || 2000}
        </p>

        {/* Availability */}
        <span
          className={`inline-block text-xs px-3 py-1 rounded-full ${
            doctor?.available
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {doctor?.available ? "Available Today" : "Not Available"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 justify-center">
        
        <button
          onClick={onViewProfile}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition"
        >
          View Profile
        </button>

        <button
          onClick={onBook}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700 transition"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;