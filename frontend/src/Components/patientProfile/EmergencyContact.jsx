import React from "react";
import { usePatient } from "../../context/patients/PatientContext";
import PhoneInput from "../PhoneInput";

const EmergencyContact = () => {
  const { profile, setProfile, setIsDirty } = usePatient();

  const contact = profile.patient?.emergencyContact || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  // const labelClass = "mb-2 text-sm font-medium text-gray-600";
  const labelClass = "mb-2 text-sm font-medium text-gray-600";

  const handleEmergencyChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        emergencyContact: {
          ...prev.patient?.emergencyContact,
          [field]: value,
        },
      },
    }));
    setIsDirty(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Emergency Contact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={contact.name || ""}
            onChange={(e) => handleEmergencyChange("name", e.target.value)}
            className={inputClass}
            placeholder="Enter full name"
          />
        </div>

        {/* Phone */}
     
        <div>
          <label className={labelClass}>Phone</label>
          <PhoneInput
            value={contact?.phone || ""}
            onChange={(value) => handleEmergencyChange("phone", value)}
          />
        </div>

        {/* Relation */}
        <div>
          <label className={labelClass}>Relation</label>
          <select
            value={contact.relation || ""}
            onChange={(e) => handleEmergencyChange("relation", e.target.value)}
            className={inputClass}
          >
            <option value="">Select Relation</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="brother">Brother</option>
            <option value="sister">Sister</option>
            <option value="husband">Husband</option>
            <option value="wife">Wife</option>
            <option value="friend">Friend</option>
            <option value="guardian">Guardian</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>Address</label>
          <textarea
            rows={3}
            value={contact.address || ""}
            onChange={(e) => handleEmergencyChange("address", e.target.value)}
            className={inputClass}
            placeholder="Enter emergency contact address"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
