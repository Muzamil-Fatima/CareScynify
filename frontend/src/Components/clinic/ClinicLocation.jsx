import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";

const ClinicLocation = ({ clinic }) => {
  const address =
    clinic?.address || "Main Market, City Center, Near Hospital Road";

  const phone = clinic?.phone || "+92 300 1234567";

  const mapUrl =
    clinic?.mapUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Clinic Location
      </h2>

      {/* Address */}
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <LocationOnOutlinedIcon fontSize="small" className="text-purple-600" />
        <p>{address}</p>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <PhoneOutlinedIcon fontSize="small" className="text-purple-600" />
        <p>{phone}</p>
      </div>

      {/* Map */}
      <div className="w-full h-48 rounded-xl overflow-hidden border">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0"
          title="clinic-map"
        ></iframe>
      </div>

      {/* Button */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          address
        )}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition"
      >
        <DirectionsOutlinedIcon fontSize="small" />
        Get Directions
      </a>
    </div>
  );
};

export default ClinicLocation;