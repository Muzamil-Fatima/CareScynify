import React from "react";
import { useNavigate } from "react-router-dom";

const LabCard = ({ laboratory }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/laboratory/${laboratory._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition border border-gray-100">
      {/* Lab Logo */}

      {laboratory.user?.avatar?.url ? (
        <img
          src={laboratory.user.avatar.url}
          alt={laboratory.labName}
          className="w-26 h-26 rounded-full object-cover mx-auto"
        />
      ) : (
        <div className="w-26 h-26 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mx-auto">
          🧪
        </div>
      )}

      {/* Lab Name */}

      <h2 className="text-lg font-semibold text-center mt-3">
        {laboratory.labName}
      </h2>

      {/* Lab Type */}

      <p className="text-center text-blue-600 font-medium">
        {laboratory.labType || "Diagnostic Laboratory"}
      </p>

      {/* Location */}

      <p className="text-center text-sm text-gray-500 mt-2">
        📍 {laboratory.city || "Location not added"}
      </p>

      {/* Services */}

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {laboratory.homeSampleCollection && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
            🏠 Home Collection
          </span>
        )}

        {laboratory.onlineReports && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
            📄 Online Reports
          </span>
        )}

        {laboratory.emergencyTesting && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
            🚨 Emergency Testing
          </span>
        )}
      </div>

      {/* Status */}

      <p className="text-center text-sm mt-3">
        {laboratory.isOpen ? (
          <span className="text-green-600 font-medium">Open Now</span>
        ) : (
          <span className="text-red-500 font-medium">Closed</span>
        )}
      </p>

      {/* Button */}

      <button
        onClick={handleClick}
        className="mt-4 w-full cursor-pointer bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
      >
        View Lab
      </button>
    </div>
  );
};

export default LabCard;
