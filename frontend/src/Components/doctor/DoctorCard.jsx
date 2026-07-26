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
     {doctor.user?.avatar?.url ? (
  <img
    src={doctor.user.avatar.url}
    alt={doctor.user?.name}
    className="w-26 h-26 rounded-full object-cover"
  />
) : (
  <div className="w-26 h-26 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
    👤
  </div>
)}

      {/* Name */}
      <h2 className="text-lg font-semibold text-center">{doctor.user?.name}</h2>

      {/* Specialization */}
      <p className="text-center text-blue-600 font-medium">
        {doctor.specialization}
      </p>

      {/* Experience */}
      <p className="text-center text-sm text-gray-500 mt-2 mb-3">
        {doctor.experience
          ? `${doctor.experience}+ experience`
          : "Experience not added"}
      </p>

      {/* Treats / Conditions */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {(
          doctor.treatableConditions || [
            "Skin issues",
            "Hair problems",
            "Allergies",
          ]
        )
          .slice(0, 3)
          .map((item, i) => (
            <span
              key={i}
              className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600"
            >
              {item}
            </span>
          ))}
      </div>

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
