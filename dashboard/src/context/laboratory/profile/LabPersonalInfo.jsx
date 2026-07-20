import React from "react";
import PhoneInput from "../../PhoneInput";
import { useLaboratory } from "../../../context/laboratory/LaboratoryContext";

const LabPersonalInfo = () => {
  const { profile, setProfile, setIsDirty } = useLaboratory();

  const user = profile?.user || {};
  const laboratory = profile?.laboratory || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const labelClass = "mb-2 text-sm font-medium text-gray-600";

  const handleChange = (field, value, section = "laboratory") => {
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Laboratory Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Laboratory Name */}
        <div>
          <label className={labelClass}>Laboratory Name</label>
          <input
            type="text"
            className={inputClass}
            placeholder="ABC Diagnostic Laboratory"
            value={laboratory?.laboratoryName || ""}
            onChange={(e) =>
              handleChange("laboratoryName", e.target.value)
            }
          />
        </div>

        {/* Owner / Manager */}
        <div>
          <label className={labelClass}>Owner / Manager Name</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Dr. Muhammad Ali"
            value={laboratory?.ownerName || ""}
            onChange={(e) => handleChange("ownerName", e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            readOnly
            className={`${inputClass} bg-gray-100 cursor-not-allowed`}
            value={user?.email || ""}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone Number</label>

          <PhoneInput
            value={user?.phone || ""}
            onChange={(value) => handleChange("phone", value, "user")}
          />
        </div>

        {/* CNIC */}
        <div>
          <label className={labelClass}>CNIC</label>
          <input
            type="text"
            className={inputClass}
            placeholder="35202-1234567-8"
            value={user?.cnic || ""}
            onChange={(e) =>
              handleChange("cnic", e.target.value, "user")
            }
          />
        </div>

        {/* Established Year */}
        <div>
          <label className={labelClass}>Established Year</label>
          <input
            type="number"
            className={inputClass}
            placeholder="2020"
            value={laboratory?.establishedYear || ""}
            onChange={(e) =>
              handleChange("establishedYear", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LabPersonalInfo;