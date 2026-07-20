import React from "react";
import { useLaboratory } from "../../../context/laboratory/LaboratoryContext";

const LabContactInfo = () => {
  const { profile, setProfile, setIsDirty } = useLaboratory();

  const laboratory = profile?.laboratory || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const labelClass = "mb-2 text-sm font-medium text-gray-600";

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
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Enter complete laboratory address"
            value={laboratory?.address || ""}
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
            value={laboratory?.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        {/* Province */}
        <div>
          <label className={labelClass}>Province</label>
          <select
            className={inputClass}
            value={laboratory?.province || ""}
            onChange={(e) => handleChange("province", e.target.value)}
          >
            <option value="">Select Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">
              Khyber Pakhtunkhwa
            </option>
            <option value="Balochistan">Balochistan</option>
            <option value="Gilgit Baltistan">
              Gilgit Baltistan
            </option>
            <option value="Azad Kashmir">Azad Kashmir</option>
            <option value="Islamabad">Islamabad Capital Territory</option>
          </select>
        </div>

        {/* Postal Code */}
        <div>
          <label className={labelClass}>Postal Code</label>
          <input
            type="text"
            className={inputClass}
            placeholder="54000"
            value={laboratory?.postalCode || ""}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        {/* Google Map URL */}
        <div>
          <label className={labelClass}>Google Maps Link</label>
          <input
            type="url"
            className={inputClass}
            placeholder="https://maps.google.com/..."
            value={laboratory?.googleMapLink || ""}
            onChange={(e) => handleChange("googleMapLink", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LabContactInfo;