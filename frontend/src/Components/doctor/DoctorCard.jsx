import React from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorContext } from "../../context/doctor/DoctorContext";
const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
const { setSelectedDoctor } = useDoctorContext();
  const handleClick = () => {
    setSelectedDoctor(doctor);
    navigate(`/doctor/${doctor._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition border border-gray-100">

      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <img
          src={doctor.user?.avatar}
          alt={doctor.user?.name}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* Name */}
      <h2 className="text-lg font-semibold text-center">
        {doctor.user?.name}
      </h2>

      {/* Specialization */}
      <p className="text-center text-blue-600 font-medium">
        {doctor.specialization}
      </p>

      {/* Experience */}
      <p className="text-center text-sm text-gray-500 mt-1">
        {doctor.experience ? `${doctor.experience}+ years experience` : "Experience not added"}
      </p>

      {/* Treats / Conditions */}
      <div className="flex flex-wrap justify-center gap-1 mt-3">
        {(doctor.treatments || ["Skin issues", "Hair problems", "Allergies"])
          .slice(0, 3)
          .map((item, i) => (
            <span
              key={i}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
      </div>

      {/* Workplace */}
      <p className="text-center text-xs text-gray-400 mt-3">
        {doctor.workplaces?.[0]?.name || "No workplace added"}
      </p>

      {/* Button */}
      <button
        onClick={handleClick}
        className="mt-4 w-full cursor-pointer bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
      >
        View Profile
      </button>
    </div>
  );
};

export default DoctorCard;