import React from "react";
import { usePharmacy } from "../../../context/pharmacy/PharmacyContext";
const PharmacyDetails = () => {
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

  const handleSwitch = (field) => {
    handleChange(field, !pharmacy[field]);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Pharmacy Services
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Configure the services and facilities offered by your pharmacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pharmacy Type */}
        <div className="md:col-span-2">
          <label className={labelClass}>Pharmacy Type</label>

          <select
            className={inputClass}
            value={pharmacy.pharmacyType || ""}
            onChange={(e) =>
              handleChange("pharmacyType", e.target.value)
            }
          >
            <option value="">Select Pharmacy Type</option>
            <option value="Retail">Retail Pharmacy</option>
            <option value="Hospital">Hospital Pharmacy</option>
            <option value="Clinic">Clinic Pharmacy</option>
            <option value="Online">Online Pharmacy</option>
            <option value="Wholesale">Wholesale Pharmacy</option>
          </select>
        </div>

        {/* Emergency Service */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Emergency Service
            </h4>
            <p className="text-sm text-gray-500">
              Available 24/7 for emergency medicine.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("emergencyService")}
            className={`relative h-7 w-14 rounded-full transition ${
              pharmacy.emergencyService
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                pharmacy.emergencyService
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Home Delivery */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Home Delivery
            </h4>
            <p className="text-sm text-gray-500">
              Deliver medicines to customers.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("homeDelivery")}
            className={`relative h-7 w-14 rounded-full transition ${
              pharmacy.homeDelivery
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                pharmacy.homeDelivery
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Online Consultation */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Online Consultation
            </h4>
            <p className="text-sm text-gray-500">
              Support online prescription services.
            </p>
          </div>

          <button
            onClick={() =>
              handleSwitch("onlineConsultationSupport")
            }
            className={`relative h-7 w-14 rounded-full transition ${
              pharmacy.onlineConsultationSupport
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                pharmacy.onlineConsultationSupport
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Currently Open */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Currently Open
            </h4>
            <p className="text-sm text-gray-500">
              Display pharmacy availability.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("isOpen")}
            className={`relative h-7 w-14 rounded-full transition ${
              pharmacy.isOpen
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                pharmacy.isOpen
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Accept Prescription Upload */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Accept Prescription Uploads
            </h4>
            <p className="text-sm text-gray-500">
              Allow customers to upload prescriptions.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("acceptPrescription")}
            className={`relative h-7 w-14 rounded-full transition ${
              pharmacy.acceptPrescription
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                pharmacy.acceptPrescription
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Cash on Delivery */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              Cash on Delivery
            </h4>
            <p className="text-sm text-gray-500">
              Accept cash payment on delivery.
            </p>
          </div>

          <button
            onClick={() => handleSwitch("cashOnDelivery")}
            className={`relative h-7 w-14 rounded-full transition ${
              pharmacy.cashOnDelivery
                ? "bg-purple-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                pharmacy.cashOnDelivery
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetails;