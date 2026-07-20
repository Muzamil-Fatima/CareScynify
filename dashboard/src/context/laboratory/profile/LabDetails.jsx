import React from "react";
import { useLaboratory } from "../../../context/laboratory/LaboratoryContext";

const LabDetails = () => {
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
        Laboratory Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration Number */}
        <div>
          <label className={labelClass}>Registration Number</label>
          <input
            type="text"
            className={inputClass}
            placeholder="LAB-2026-001"
            value={laboratory?.registrationNumber || ""}
            onChange={(e) =>
              handleChange("registrationNumber", e.target.value)
            }
          />
        </div>

        {/* License Number */}
        <div>
          <label className={labelClass}>License Number</label>
          <input
            type="text"
            className={inputClass}
            placeholder="LIC-123456"
            value={laboratory?.licenseNumber || ""}
            onChange={(e) =>
              handleChange("licenseNumber", e.target.value)
            }
          />
        </div>

        {/* NTN */}
        <div>
          <label className={labelClass}>NTN (Optional)</label>
          <input
            type="text"
            className={inputClass}
            placeholder="1234567-8"
            value={laboratory?.ntn || ""}
            onChange={(e) => handleChange("ntn", e.target.value)}
          />
        </div>

        {/* Accreditation */}
        <div>
          <label className={labelClass}>Accreditation</label>
          <select
            className={inputClass}
            value={laboratory?.accreditation || ""}
            onChange={(e) =>
              handleChange("accreditation", e.target.value)
            }
          >
            <option value="">Select Accreditation</option>
            <option value="ISO 15189">ISO 15189</option>
            <option value="CAP">CAP</option>
            <option value="JCI">JCI</option>
            <option value="PMDC Approved">PMDC Approved</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Home Sample Collection */}
        <div className="flex items-center gap-3">
          <input
            id="homeCollection"
            type="checkbox"
            checked={laboratory?.homeSampleCollection || false}
            onChange={(e) =>
              handleChange(
                "homeSampleCollection",
                e.target.checked
              )
            }
            className="w-5 h-5 accent-purple-600"
          />

          <label
            htmlFor="homeCollection"
            className="text-gray-700 font-medium"
          >
            Home Sample Collection
          </label>
        </div>

        {/* Emergency Testing */}
        <div className="flex items-center gap-3">
          <input
            id="emergencyTesting"
            type="checkbox"
            checked={laboratory?.emergencyTesting || false}
            onChange={(e) =>
              handleChange(
                "emergencyTesting",
                e.target.checked
              )
            }
            className="w-5 h-5 accent-purple-600"
          />

          <label
            htmlFor="emergencyTesting"
            className="text-gray-700 font-medium"
          >
            Emergency Testing
          </label>
        </div>

        {/* Online Reports */}
        <div className="flex items-center gap-3 md:col-span-2">
          <input
            id="onlineReports"
            type="checkbox"
            checked={laboratory?.onlineReports || false}
            onChange={(e) =>
              handleChange(
                "onlineReports",
                e.target.checked
              )
            }
            className="w-5 h-5 accent-purple-600"
          />

          <label
            htmlFor="onlineReports"
            className="text-gray-700 font-medium"
          >
            Online Reports Available
          </label>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className={labelClass}>Laboratory Description</label>

          <textarea
            rows={5}
            className={inputClass}
            placeholder="Write a brief description about your laboratory, available technologies, certifications, and specialties..."
            value={laboratory?.description || ""}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LabDetails;