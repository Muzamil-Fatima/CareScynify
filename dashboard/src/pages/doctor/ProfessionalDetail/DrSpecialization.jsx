import React from "react";

const DrSpecialization = ({ value, onChange }) => {
  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic",
    "Gynecologist",
    "Psychiatrist",
    "General Physician",
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select specialization</option>

      {specializations.map((spec) => (
        <option key={spec} value={spec}>
          {spec}
        </option>
      ))}
    </select>
  );
};

export default DrSpecialization;