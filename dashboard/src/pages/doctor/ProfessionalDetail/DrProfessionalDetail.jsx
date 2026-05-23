import React from "react";
import DrSpecialization from "./DrSpecialization";
import { useDoctor } from "../../../context/doctor/DoctorContext";

const DrProfessionalDetail = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const doctor = profile.doctor || {};

  const fields = [
    { name: "ID", type: "text", key: "ID" },
    { name: "Specialization", type: "specialization", key: "specialization" },
    { name: "Qualification", type: "text", key: "qualification" },
    { name: "License No", type: "text", key: "licenseNo" },
    { name: "Experience", type: "text", key: "experience" },
    { name: "UserName", type: "text", key: "userName" }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Professional Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-2 text-gray-700">{field.name}</label>

            {field.type === "specialization" ? (
              <DrSpecialization
                value={doctor[field.key] || ""}
                onChange={(value) => {
                  setProfile((prev) => ({
                    ...prev,
                    doctor: {
                      ...prev.doctor,
                      [field.key]: value,
                    },
                  }));

                  setIsDirty(true);
                }}
              />
            ) : (
              <input
                value={doctor[field.key] || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  setProfile((prev) => ({
                    ...prev,
                    doctor: {
                      ...prev.doctor,
                      [field.key]: value,
                    },
                  }));

                  setIsDirty(true);
                }}
                type="text"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrProfessionalDetail;