import React from "react";

const ClinicDrProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold">Doctor Profile</h1>

        <p className="text-gray-500 mt-2">
          Full details will come from backend or state
        </p>

        {/* Appointment Button */}
        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg">
          Book Appointment
        </button>

      </div>

    </div>
  );
};

export default ClinicDrProfile;