import React from "react";
import { usePharmacy } from "../../../context/pharmacy/PharmacyContext";

const PharmacyAddressInfo = () => {
  const { profile, setProfile, setIsDirty } = usePharmacy();

  const pharmacy = profile?.pharmacy || {};

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500";

  const labelClass = "block mb-2 text-sm font-medium text-gray-700";

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      pharmacy: {
        ...prev.pharmacy,
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
          Address Information
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage your pharmacy location and address details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div className="md:col-span-2">
          <label className={labelClass}>Complete Address</label>

          <textarea
            rows={4}
            className={inputClass}
            placeholder="Street, Area, Block..."
            value={pharmacy.address || ""}
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
            value={pharmacy.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        {/* Province */}
        <div>
          <label className={labelClass}>Province</label>

          <select
            className={inputClass}
            value={pharmacy.province || ""}
            onChange={(e) => handleChange("province", e.target.value)}
          >
            <option value="">Select Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">KPK</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Gilgit Baltistan">Gilgit Baltistan</option>
            <option value="Azad Kashmir">Azad Kashmir</option>
            <option value="Islamabad">Islamabad</option>
          </select>
        </div>

        {/* Postal Code */}
        <div>
          <label className={labelClass}>Postal Code</label>

          <input
            type="text"
            className={inputClass}
            placeholder="54000"
            value={pharmacy.postalCode || ""}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        {/* Google Map Link */}
        <div>
          <label className={labelClass}>Google Maps Link</label>

          <input
            type="url"
            className={inputClass}
            placeholder="https://maps.google.com/..."
            value={pharmacy.mapLink || ""}
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
            value={pharmacy.latitude || ""}
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
            value={pharmacy.longitude || ""}
            onChange={(e) => handleChange("longitude", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PharmacyAddressInfo;