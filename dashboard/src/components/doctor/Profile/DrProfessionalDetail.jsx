import React, { useState } from "react";
import { useDoctor } from "../../../context/doctor/DoctorContext";
import TreatableConditions from "./TreatableConditions";

const DrProfessionalDetail = () => {
  const { profile, setProfile, setIsDirty, setSignatureFile } = useDoctor();

  const doctor = profile?.doctor || {};

  const [signaturePreview, setSignaturePreview] = useState(null);

  const signatureUrl = signaturePreview || doctor.digitalSignature?.url || "";

  const fields = [
    {
      name: "Specialization",
      type: "specialization",
      key: "specialization",
    },
    {
      name: "Qualification",
      type: "text",
      key: "qualifications",
    },
    {
      name: "License No",
      type: "text",
      key: "licenseNo",
    },
    {
      name: "Experience",
      type: "text",
      key: "experience",
    },
    {
      name: "About Yourself",
      type: "textarea",
      key: "about",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Professional Details
      </h2>

      {/* Professional Fields */}
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
                className="w-full border border-gray-300 rounded-lg p-2
                  focus:outline-none focus:ring-2 focus:ring-purple-400
                  resize-none"
              />
            ) : (
              <input
                type="text"
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
                className="w-full border border-gray-300 rounded-lg p-2
                  focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}
          </div>
        ))}
      </div>

      {/* Doctor ID & Digital Signature */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor ID */}
        <div>
          <label className="block mb-2 text-gray-700">Doctor ID:</label>

          <input
            value={doctor.drId || ""}
            type="text"
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2
              bg-gray-300 cursor-not-allowed"
          />
        </div>

        {/* Digital Signature */}
        <div>
          <label className="block mb-2 text-gray-700">Digital Signature:</label>

          {/* Signature Preview */}
          {signatureUrl && (
            <div className="mb-3 border border-gray-200 rounded-lg p-3 w-fit bg-white">
              <img
                src={signatureUrl}
                alt="Doctor Digital Signature"
                className="h-20 max-w-62.5 object-contain"
              />
            </div>
          )}

          {/* Upload */}
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const previewUrl = URL.createObjectURL(file);

              setSignaturePreview(previewUrl);
              setSignatureFile(file);
              setIsDirty(true);
            }}
            className="block w-full text-sm text-gray-600
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-lg
              file:border-0
              file:bg-purple-600
              file:text-white
              hover:file:bg-purple-700"
          />

          <p className="mt-2 text-xs text-gray-500">
            Upload your signature as PNG or JPG.
          </p>
        </div>
      </div>

      {/* Treatable Conditions */}
      <div className="mt-6">
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
    </div>
  );
};

export default DrProfessionalDetail;
