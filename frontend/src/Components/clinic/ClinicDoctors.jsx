import React from "react";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import StarIcon from "@mui/icons-material/Star";

const ClinicDoctors = ({ doctors = [], onView, onBook }) => {
  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  if (safeDoctors.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No doctors available in this clinic
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Doctors Available
      </h2>

      {/* Doctors List */}
      <div className="space-y-3">
        {safeDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex items-center justify-between border rounded-xl p-3 hover:shadow-sm transition"
          >

            {/* Left */}
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-12 h-12 bg-purple-100 text-purple-700 flex items-center justify-center rounded-full font-bold">
                {doctor?.name?.charAt(0) || "D"}
              </div>

              {/* Info */}
              <div>
                <h3 className="font-medium text-gray-800">
                  {doctor?.name || "Doctor Name"}
                </h3>

                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MedicalServicesOutlinedIcon fontSize="small" />
                  {doctor?.specialty || "General Physician"}
                </p>

                <p className="text-xs text-gray-500">
                  {doctor?.experience || 5}+ years experience
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-2">

              {/* Rating */}
              <span className="flex items-center gap-1 text-sm text-yellow-500">
                <StarIcon fontSize="small" />
                {doctor?.rating || 4.5}
              </span>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onView?.(doctor)}
                  className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100"
                >
                  View
                </button>

                <button
                  onClick={() => onBook?.(doctor)}
                  className="text-xs px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Book
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicDoctors;