import React from "react";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const DoctorProfileHeader = ({ doctor, onBook }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-5">
      
      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">
          {doctor?.name?.charAt(0) || "D"}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-2">
        
        {/* Name + Verified */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            {doctor?.name || "Doctor Name"}
          </h1>

          <VerifiedIcon className="text-blue-500" fontSize="small" />
        </div>

        {/* Specialty */}
        <p className="text-gray-600">
          {doctor?.specialty || "Specialist Doctor"}
        </p>

        {/* Rating + Experience */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <StarIcon fontSize="small" />
            {doctor?.rating || "4.5"} ({doctor?.reviews || 120} reviews)
          </span>

          <span className="flex items-center gap-1">
            <WorkOutlineOutlinedIcon fontSize="small" />
            {doctor?.experience || "10+ years experience"}
          </span>
        </div>

        {/* Hospital */}
        <p className="flex items-center gap-1 text-sm text-gray-600">
          <LocalHospitalOutlinedIcon fontSize="small" />
          {doctor?.hospital || "City Medical Complex Hospital"}
        </p>

        {/* Fee */}
        <p className="text-sm font-medium text-purple-700">
          Consultation Fee: Rs. {doctor?.fee || 2000}
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          
          <button
            onClick={onBook}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            Book Appointment
          </button>

          <button className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
            Contact Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileHeader;