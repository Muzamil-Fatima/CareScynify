import React from "react";
import { usePatient } from "../../context/patients/PatientContext";

const EmergencyContact = () => {
  const { profile, setProfile } = usePatient();

  const contact = profile?.emergencyContact || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Emergency Contact
      </h2>

      <input
        value={contact.name || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            emergencyContact: {
              ...contact,
              name: e.target.value,
            },
          })
        }
        className={inputClass}
        placeholder="Name"
      />

      <input
        value={contact.phone || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            emergencyContact: {
              ...contact,
              phone: e.target.value,
            },
          })
        }
        className={inputClass}
        placeholder="Phone"
      />
    </div>
  );
};

export default EmergencyContact;
