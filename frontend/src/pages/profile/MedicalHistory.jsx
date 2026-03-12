import React from "react";

const MedicalHistory = ({ patient }) => {

  return (
    <div className="bg-white shadow rounded p-5">

      <h2 className="text-xl font-bold mb-3">
        Medical History
      </h2>

      <p>
        <strong>Allergies:</strong>
        {patient.allergies?.join(", ") || "None"}
      </p>

      <p>
        <strong>Medications:</strong>
        {patient.medications?.join(", ") || "None"}
      </p>

    </div>
  );
};

export default MedicalHistory;