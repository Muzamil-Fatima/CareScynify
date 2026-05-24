import React from "react";
import DrConsultation from "./DrConsultation";
import AppointmentSettings from "./AppointmentSettings";

const DrAvailabilityDetails = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Appointment Details
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage schedule, consultation settings and fees
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left */}
        <div className="md:col-span-2">
          <DrConsultation />
        </div>

        {/* Right */}
        <div className="md:col-span-1">
          <AppointmentSettings />
        </div>

      </div>
    </div>
  );
};

export default DrAvailabilityDetails;