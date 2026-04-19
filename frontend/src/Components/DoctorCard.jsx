import React from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../hooks/useDoctor";

const DoctorCard = ({ doc }) => {
  const navigate = useNavigate();
  const { setSelectedDoctor } = useDoctor();

  const handleClick = () => {
    setSelectedDoctor(doc);
    navigate(`/doctor/${doc.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">
      <div className="flex justify-center mb-4">
        <img
          src={doc.image}
          alt={doc.name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <h2 className="text-xl font-semibold text-center">{doc.name}</h2>
      <p className="text-center text-blue-600">{doc.specialization}</p>

      <p className="text-center text-sm text-gray-500 mt-2">
        {doc.hospital}
      </p>

      <button
        onClick={handleClick}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        View Profile
      </button>
    </div>
  );
};

export default DoctorCard;