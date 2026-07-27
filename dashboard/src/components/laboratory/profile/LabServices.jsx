import React from "react";
import { useLabProfile } from "../../../context/laboratory/LabProfileContext";
const LabServices = () => {
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

  const handleSwitch = (field) => {
    handleChange(field, !laboratory[field]);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Laboratory Services
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Configure the services and facilities offered by your laboratory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Laboratory Type */}
        <div className="md:col-span-2">
          <label className={labelClass}>Laboratory Type</label>

          <select
            className={inputClass}
            value={laboratory.labType || ""}
            onChange={(e) => handleChange("labType", e.target.value)}
          >
            <option value="">Select Laboratory Type</option>
            <option value="Diagnostic">Diagnostic Laboratory</option>
            <option value="Clinical">Clinical Laboratory</option>
            <option value="Pathology">Pathology Laboratory</option>
            <option value="Radiology">Radiology Laboratory</option>
            <option value="Research">Research Laboratory</option>
          </select>
        </div>

        {/* Home Sample Collection */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Home Sample Collection
            </h4>
            <p className="text-sm text-gray-500">
              Collect patient samples from home.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("homeSampleCollection")}
            className={`relative h-7 w-14 rounded-full transition ${
              laboratory.homeSampleCollection
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                laboratory.homeSampleCollection ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Online Reports */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">Online Reports</h4>
            <p className="text-sm text-gray-500">
              Allow patients to download reports online.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("onlineReports")}
            className={`relative h-7 w-14 rounded-full transition ${
              laboratory.onlineReports ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                laboratory.onlineReports ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Emergency Testing */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Emergency Testing
            </h4>
            <p className="text-sm text-gray-500">
              Provide urgent laboratory testing services.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("emergencyTesting")}
            className={`relative h-7 w-14 rounded-full transition ${
              laboratory.emergencyTesting
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                laboratory.emergencyTesting ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Currently Open */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">Currently Open</h4>
            <p className="text-sm text-gray-500">
              Display laboratory availability.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("isOpen")}
            className={`relative h-7 w-14 rounded-full transition ${
              laboratory.isOpen ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                laboratory.isOpen ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Online Booking */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Online Test Booking
            </h4>
            <p className="text-sm text-gray-500">
              Allow patients to book tests online.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("onlineBooking")}
            className={`relative h-7 w-14 rounded-full transition ${
              laboratory.onlineBooking
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                laboratory.onlineBooking ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Digital Reports */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Digital Reports
            </h4>
            <p className="text-sm text-gray-500">
              Generate reports in digital format.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("digitalReports")}
            className={`relative h-7 w-14 rounded-full transition ${
              laboratory.digitalReports
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                laboratory.digitalReports ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabServices;