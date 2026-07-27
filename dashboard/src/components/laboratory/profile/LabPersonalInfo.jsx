import React from "react";
import { useLabProfile } from "../../../context/laboratory/LabProfileContext";
const LabPersonalInfo = () => {
  const { profile, setProfile, setIsDirty } = useLabProfile();

  const user = profile?.user || {};
  const laboratory = profile?.laboratory || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition";

  const labelClass = "block mb-2 text-sm font-medium text-gray-700";

  const handleChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setIsDirty(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Laboratory Information
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Update your laboratory's basic information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Laboratory Name */}
        <div>
          <label className={labelClass}>Laboratory Name</label>

          <input
            type="text"
            className={inputClass}
            placeholder="ABC Diagnostic Laboratory"
            value={laboratory.labName || ""}
            onChange={(e) =>
              handleChange("laboratory", "labName", e.target.value)
            }
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className={labelClass}>Owner Name</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Muhammad Ali"
            value={laboratory.ownerName || ""}
            onChange={(e) =>
              handleChange("laboratory", "ownerName", e.target.value)
            }
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className={labelClass}>Registration Number</label>

          <input
            type="text"
            className={inputClass}
            placeholder="REG-123456"
            value={laboratory.registrationNumber || ""}
            onChange={(e) =>
              handleChange(
                "laboratory",
                "registrationNumber",
                e.target.value
              )
            }
          />
        </div>

        {/* License Number */}
        <div>
          <label className={labelClass}>License Number</label>

          <input
            type="text"
            className={inputClass}
            placeholder="LIC-987654"
            value={laboratory.licenseNumber || ""}
            onChange={(e) =>
              handleChange("laboratory", "licenseNumber", e.target.value)
            }
          />
        </div>

        {/* Tax Number */}
        <div>
          <label className={labelClass}>Tax Number (NTN)</label>

          <input
            type="text"
            className={inputClass}
            placeholder="1234567-8"
            value={laboratory.taxNumber || ""}
            onChange={(e) =>
              handleChange("laboratory", "taxNumber", e.target.value)
            }
          />
        </div>

        {/* Verification Status */}
        <div>
          <label className={labelClass}>Verification Status</label>

          <div
            className={`rounded-xl px-4 py-3 font-medium border ${
              laboratory.verificationStatus === "verified"
                ? "bg-green-50 border-green-300 text-green-700"
                : laboratory.verificationStatus === "rejected"
                ? "bg-red-50 border-red-300 text-red-700"
                : "bg-yellow-50 border-yellow-300 text-yellow-700"
            }`}
          >
            {laboratory.verificationStatus
              ? laboratory.verificationStatus.charAt(0).toUpperCase() +
                laboratory.verificationStatus.slice(1)
              : "Pending"}
          </div>
        </div>

        {/* Account Status */}
        <div>
          <label className={labelClass}>Account Status</label>

          <div
            className={`rounded-xl px-4 py-3 font-medium border ${
              user.status === "active"
                ? "bg-green-50 border-green-300 text-green-700"
                : user.status === "inactive"
                ? "bg-gray-100 border-gray-300 text-gray-600"
                : "bg-red-50 border-red-300 text-red-700"
            }`}
          >
            {user.status
              ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
              : "Active"}
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>

          <textarea
            rows={5}
            className={inputClass}
            placeholder="Write a short introduction about your laboratory..."
            value={laboratory.description || ""}
            onChange={(e) =>
              handleChange("laboratory", "description", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LabPersonalInfo;