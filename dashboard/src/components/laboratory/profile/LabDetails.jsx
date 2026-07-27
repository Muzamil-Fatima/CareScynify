import React from "react";
import { useLabProfile } from "../../../context/laboratory/LabProfileContext";
const LabDetails = () => {
  const { profile, setProfile, setIsDirty } = useLabProfile();

  const laboratory = profile?.laboratory || {};

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500";

  const labelClass = "block mb-2 text-sm font-medium text-gray-700";

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      laboratory: {
        ...prev.laboratory,
        [field]: value,
      },
    }));

    setIsDirty(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Laboratory Details
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage your laboratory location and business information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div className="md:col-span-2">
          <label className={labelClass}>Business Address</label>

          <textarea
            rows={4}
            className={inputClass}
            placeholder="Street, Area, Block..."
            value={laboratory.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        {/* City */}
        <div>
          <label className={labelClass}>City</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Lahore"
            value={laboratory.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        {/* Province */}
        <div>
          <label className={labelClass}>State / Province / Region</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Punjab"
            value={laboratory.province || ""}
            onChange={(e) => handleChange("province", e.target.value)}
          />
        </div>

        {/* Country */}
        <div>
          <label className={labelClass}>Country</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Pakistan"
            value={laboratory.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className={labelClass}>Postal Code</label>

          <input
            type="text"
            className={inputClass}
            placeholder="54000"
            value={laboratory.postalCode || ""}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        {/* Google Maps Link */}
        <div>
          <label className={labelClass}>Google Maps Link</label>

          <input
            type="url"
            className={inputClass}
            placeholder="https://maps.google.com/..."
            value={laboratory.mapLink || ""}
            onChange={(e) => handleChange("mapLink", e.target.value)}
          />
        </div>

        {/* Latitude */}
        <div>
          <label className={labelClass}>Latitude</label>

          <input
            type="number"
            step="any"
            className={inputClass}
            placeholder="31.5204"
            value={laboratory.latitude || ""}
            onChange={(e) => handleChange("latitude", e.target.value)}
          />
        </div>

        {/* Longitude */}
        <div>
          <label className={labelClass}>Longitude</label>

          <input
            type="number"
            step="any"
            className={inputClass}
            placeholder="74.3587"
            value={laboratory.longitude || ""}
            onChange={(e) => handleChange("longitude", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LabDetails;