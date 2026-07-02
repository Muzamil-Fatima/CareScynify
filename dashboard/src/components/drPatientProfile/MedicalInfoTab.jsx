import React from "react";
import { usePatient } from "../../context/patients/PatientContext";

import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

const MedicalInfoTab = () => {
  const { patient, loading } = usePatient();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Loading medical information...</p>
      </div>
    );
  }

  const patientInfo = patient || {};

  const allergies = patientInfo.allergies || [];
  const medications = patientInfo.medications || [];
  const chronicDiseases = patientInfo.chronicDiseases || [];

  const medicalHistory = patientInfo.medicalHistory || {
    diseases: [],
    surgeries: [],
    familyHistory: "",
    smoking: "",
    alcohol: "",
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Allergies */}
      <div className="bg-white rounded-xl  border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center">
            <VaccinesRoundedIcon className="text-red-600" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Allergies
          </h2>
        </div>

        {allergies.length > 0 ? (
          <div className="space-y-3">
            {allergies.map((item, index) => (
              <div
                key={index}
                className="px-4 py-3 rounded-xl bg-violet-50/40 border border-violet-100 text-gray-700 shadow-none"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No allergies found.</p>
        )}
      </div>

      {/* Medications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(99,102,241,0.06)] p-6 transition-all duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center">
            <MedicationRoundedIcon className="text-green-600" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Current Medications
          </h2>
        </div>

        {medications.length > 0 ? (
          <div className="space-y-3">
            {medications.map((item, index) => (
              <div
                key={index}
                className="px-4 py-3 rounded-xl bg-violet-50/40 border border-violet-100 text-gray-700 shadow-none"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No medications available.
          </p>
        )}
      </div>

      {/* Chronic Diseases */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(99,102,241,0.06)] p-6 transition-all duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center">
            <FavoriteRoundedIcon className="text-pink-600" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Chronic Diseases
          </h2>
        </div>

        {chronicDiseases.length > 0 ? (
          <div className="space-y-3">
            {chronicDiseases.map((item, index) => (
              <div
                key={index}
                className="px-4 py-3 rounded-xl bg-violet-50/40 border border-violet-100 text-gray-700 shadow-none"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No chronic diseases.
          </p>
        )}
      </div>

      {/* Medical History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(99,102,241,0.06)] p-6 transition-all duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center">
            <HistoryRoundedIcon className="text-blue-600" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Medical History
          </h2>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Diseases
            </p>

            {medicalHistory.diseases?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {medicalHistory.diseases.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No disease history.
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Surgeries
            </p>

            {medicalHistory.surgeries?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {medicalHistory.surgeries.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No surgery history.
              </p>
            )}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Family History
              </span>

              <span className="font-medium text-gray-800">
                {medicalHistory.familyHistory || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Smoking
              </span>

              <span className="font-medium text-gray-800">
                {medicalHistory.smoking || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Alcohol
              </span>

              <span className="font-medium text-gray-800">
                {medicalHistory.alcohol || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoTab;