import React from "react";

const EmergencyContact = ({ patient }) => {

  const contact = patient.emergencyContact || {};

  return (
    <div className="bg-white shadow rounded p-5">

      <h2 className="text-xl font-bold mb-3">
        Emergency Contact
      </h2>

      <p>
        <strong>Name:</strong> {contact.name || "Not Added"}
      </p>

      <p>
        <strong>Phone:</strong> {contact.phone || "Not Added"}
      </p>

    </div>
  );
};

export default EmergencyContact;