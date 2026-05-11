import React from "react";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import EmergencyOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";

const defaultFacilities = [
  { name: "24/7 Emergency", icon: <EmergencyOutlinedIcon fontSize="small" /> },
  { name: "Laboratory", icon: <BloodtypeOutlinedIcon fontSize="small" /> },
  { name: "Pharmacy", icon: <LocalHospitalOutlinedIcon fontSize="small" /> },
  { name: "Parking", icon: <LocalParkingOutlinedIcon fontSize="small" /> },
  { name: "Free WiFi", icon: <WifiOutlinedIcon fontSize="small" /> },
  { name: "Extended Hours", icon: <AccessTimeOutlinedIcon fontSize="small" /> },
];

const ClinicFacilities = ({ facilities }) => {
  const data = facilities?.length ? facilities : defaultFacilities;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Clinic Facilities
      </h2>

      {/* Facilities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 border rounded-xl hover:bg-gray-50 transition"
          >
            <span className="text-purple-600">{item.icon}</span>
            <span className="text-sm text-gray-700">{item.name}</span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ClinicFacilities;