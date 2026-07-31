import React from "react";
import { useNavigate } from "react-router-dom";
import { useLabContext } from "../../context/laboratory/LabContext";

const LabTestCard = ({ labtest }) => {
  const navigate = useNavigate();
  const { setSelectedLabTest } = useLabContext();

  const handleClick = () => {
    setSelectedLabTest(labtest);
    navigate(`/labtest/${labtest._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition border border-gray-100">
      {/* Test Icon */}

      <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-4xl mx-auto">
        🧪
      </div>

      {/* Test Name */}

      <h2 className="text-xl font-semibold text-center mt-4">
        {labtest.name}
      </h2>

      {/* Test Code */}

      <p className="text-center text-sm text-gray-500 mt-1">
        Code: {labtest.code}
      </p>

      {/* Category */}

      <p className="text-center text-purple-600 font-medium mt-2">
        {labtest.category}
      </p>

      {/* Details */}

      <div className="mt-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Price</span>

          <span className="font-semibold text-gray-800">
            Rs. {labtest.price}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Turn Around</span>

          <span className="font-semibold text-gray-800">
            {labtest.turnAround}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>

          <span
            className={`font-semibold ${
              labtest.status === "Active"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {labtest.status}
          </span>
        </div>
      </div>

      {/* Button */}

      <button
        onClick={handleClick}
        className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default LabTestCard;