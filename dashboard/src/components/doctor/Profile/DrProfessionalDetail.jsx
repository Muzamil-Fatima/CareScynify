import React from "react";
import DrSpecialization from "./DrSpecialization";
import { useDoctor } from "../../../context/doctor/DoctorContext";
import TreatableConditions from "./TreatableConditions";

const DrProfessionalDetail = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const doctor = profile.doctor || {};

  const fields = [
    { name: "Specialization", type: "specialization", key: "specialization" },
    { name: "Qualification", type: "text", key: "qualifications" },
    { name: "License No", type: "text", key: "licenseNo" },
    { name: "Experience", type: "text", key: "experience" },
    { name: "About Yourself", type: "textarea", key: "about" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Professional Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`flex flex-col ${
              field.type === "textarea" ? "md:col-span-2" : ""
            }`}
          >
            <label className="mb-2 text-gray-700">{field.name}</label>

            {field.type === "textarea" ? (
              <textarea
                rows={5}
                value={doctor[field.key] || ""}
                onChange={(e) => {
                  setProfile((prev) => ({
                    ...prev,
                    doctor: {
                      ...prev.doctor,
                      [field.key]: e.target.value,
                    },
                  }));
                }}
                onBlur={() => {
                  setIsDirty(true);
                }}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
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
      <TreatableConditions
        value={doctor.treatableConditions || []}
        onChange={(value) => {
          setProfile((prev) => ({
            ...prev,
            doctor: {
              ...prev.doctor,
              treatableConditions: value,
            },
          }));

          setIsDirty(true);
        }}
      />
    </div>
  );
};

export default DrProfessionalDetail;
