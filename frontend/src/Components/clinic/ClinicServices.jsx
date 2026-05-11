import React from "react";

import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import EmergencyOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

const defaultServices = [
  { name: "Emergency Care", icon: <EmergencyOutlinedIcon /> },
  { name: "Laboratory Tests", icon: <BloodtypeOutlinedIcon /> },
  { name: "X-Ray & Imaging", icon: <ScienceOutlinedIcon /> },
  { name: "ICU Support", icon: <MonitorHeartOutlinedIcon /> },
  { name: "Vaccination", icon: <VaccinesOutlinedIcon /> },
  { name: "General Consultation", icon: <LocalHospitalOutlinedIcon /> },
];

const ClinicServices = ({ services }) => {
  const data = services?.length ? services : defaultServices;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Clinic Services
      </h2>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

        {data.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 border rounded-xl hover:bg-gray-50 transition"
          >

            <span className="text-purple-600">{service.icon}</span>

            <span className="text-sm text-gray-700">
              {service.name}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ClinicServices;