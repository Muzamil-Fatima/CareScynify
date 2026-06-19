import React from "react";
import { usePatient } from "../../context/patients/PatientContext";

const MedicalHistory = () => {
  const { profile, setProfile } = usePatient();

  const patient = profile?.patient || {};
  const medicalHistory = patient?.medicalHistory || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const labelClass =
    "mb-2 text-sm font-medium text-gray-600";

  const handlePatientChange = (
    field,
    value,
    isArray = false
  ) => {
    setProfile((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        [field]: isArray
          ? value
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean)
          : value,
      },
    }));
  };

  const handleMedicalChange = (
    field,
    value,
    isArray = false
  ) => {
    setProfile((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        medicalHistory: {
          ...prev.patient?.medicalHistory,
          [field]: isArray
            ? value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean)
            : value,
        },
      },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Medical History
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Diseases */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Diseases
          </label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Diabetes, Blood Pressure"
            value={
              medicalHistory?.diseases?.join(", ") ||
              ""
            }
            onChange={(e) =>
              handleMedicalChange(
                "diseases",
                e.target.value,
                true
              )
            }
          />
        </div>

        {/* Allergies */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Allergies
          </label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Dust, Penicillin"
            value={
              patient?.allergies?.join(", ") || ""
            }
            onChange={(e) =>
              handlePatientChange(
                "allergies",
                e.target.value,
                true
              )
            }
          />
        </div>

        {/* Medications */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Current Medications
          </label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Panadol, Vitamins"
            value={
              patient?.medications?.join(", ") ||
              ""
            }
            onChange={(e) =>
              handlePatientChange(
                "medications",
                e.target.value,
                true
              )
            }
          />
        </div>

        {/* Surgeries */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Past Surgeries
          </label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Appendix surgery"
            value={
              medicalHistory?.surgeries?.join(
                ", "
              ) || ""
            }
            onChange={(e) =>
              handleMedicalChange(
                "surgeries",
                e.target.value,
                true
              )
            }
          />
        </div>

        {/* Family History */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Family History
          </label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Genetic diseases"
            value={
              medicalHistory?.familyHistory ||
              ""
            }
            onChange={(e) =>
              handleMedicalChange(
                "familyHistory",
                e.target.value
              )
            }
          />
        </div>

        {/* Smoking */}
        <div>
          <label className={labelClass}>
            Smoking
          </label>
          <select
            className={inputClass}
            value={
              medicalHistory?.smoking || ""
            }
            onChange={(e) =>
              handleMedicalChange(
                "smoking",
                e.target.value
              )
            }
          >
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="occasionally">
              Occasionally
            </option>
          </select>
        </div>

        {/* Alcohol */}
        <div>
          <label className={labelClass}>
            Alcohol
          </label>
          <select
            className={inputClass}
            value={
              medicalHistory?.alcohol || ""
            }
            onChange={(e) =>
              handleMedicalChange(
                "alcohol",
                e.target.value
              )
            }
          >
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="occasionally">
              Occasionally
            </option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default MedicalHistory;