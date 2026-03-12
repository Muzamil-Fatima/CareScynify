import React from "react";

const ProfileCard = ({ patient }) => {
  return (
    <div className="bg-white shadow rounded p-5">

      <h2 className="text-xl font-bold mb-3">
        Patient Profile
      </h2>

      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>

    </div>
  );
};

export default ProfileCard;