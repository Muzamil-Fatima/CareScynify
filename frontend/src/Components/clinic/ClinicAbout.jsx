import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

const ClinicAbout = ({ clinic }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <InfoOutlinedIcon fontSize="small" />
        About Clinic
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {clinic?.about ||
          "This clinic provides high-quality healthcare services with experienced doctors, modern medical equipment, and patient-centered care. We focus on accurate diagnosis and effective treatment for all patients."}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">

        {/* Established */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarMonthOutlinedIcon fontSize="small" />
          Established: {clinic?.established || "2010"}
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <PhoneOutlinedIcon fontSize="small" />
          {clinic?.phone || "+92 300 1234567"}
        </div>

      </div>

      {/* Mission */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Our Mission: </span>
          To provide affordable, accessible, and high-quality healthcare services for everyone.
        </p>
      </div>

    </div>
  );
};

export default ClinicAbout;