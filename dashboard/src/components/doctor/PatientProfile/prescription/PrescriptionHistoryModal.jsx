import React from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

const boxClass = "rounded-xl border border-slate-200 bg-slate-50 p-4";

const PrescriptionHistoryModal = ({
  open,
  prescription,
  onClose,
  onUseTemplate,
}) => {
  if (!open || !prescription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Prescription Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Created on{" "}
              {new Date(prescription.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Diagnosis */}
          <div className={boxClass}>
            <div className="mb-3 flex items-center gap-2">
              <NoteAltRoundedIcon className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">
                Diagnosis
              </h3>
            </div>

            <p className="whitespace-pre-wrap text-slate-600">
              {prescription.diagnosis || "-"}
            </p>
          </div>

          {/* Symptoms */}
          <div className={boxClass}>
            <div className="mb-3 flex items-center gap-2">
              <NoteAltRoundedIcon className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">
                Symptoms
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {prescription.symptoms?.length ? (
                prescription.symptoms.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">No symptoms</p>
              )}
            </div>
          </div>

          {/* Medicines */}
          <div className={boxClass}>
            <div className="mb-4 flex items-center gap-2">
              <MedicationRoundedIcon className="text-green-600" />
              <h3 className="font-semibold text-slate-800">
                Medicines
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-slate-100">
                    <th className="px-4 py-3 text-left text-sm">
                      Medicine
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Dosage
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Frequency
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-left text-sm">
                      Instructions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {prescription.medicines?.map((medicine, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0"
                    >
                      <td className="px-4 py-3">
                        {medicine.medicine}
                      </td>

                      <td className="px-4 py-3">
                        {medicine.dosage}
                      </td>

                      <td className="px-4 py-3">
                        {medicine.frequency}
                      </td>

                      <td className="px-4 py-3">
                        {medicine.duration}
                      </td>

                      <td className="px-4 py-3">
                        {medicine.instructions || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lab Tests */}
          <div className={boxClass}>
            <div className="mb-3 flex items-center gap-2">
              <BiotechRoundedIcon className="text-blue-600" />
              <h3 className="font-semibold text-slate-800">
                Recommended Lab Tests
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {prescription.labTests?.length ? (
                prescription.labTests.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">
                  No lab tests recommended.
                </p>
              )}
            </div>
          </div>

          {/* Advice */}
          <div className={boxClass}>
            <div className="mb-3 flex items-center gap-2">
              <NoteAltRoundedIcon className="text-orange-600" />
              <h3 className="font-semibold text-slate-800">
                Advice
              </h3>
            </div>

            <p className="whitespace-pre-wrap text-slate-600">
              {prescription.advice || "-"}
            </p>
          </div>

          {/* Follow Up */}
          <div className={boxClass}>
            <div className="mb-3 flex items-center gap-2">
              <EventRoundedIcon className="text-purple-600" />
              <h3 className="font-semibold text-slate-800">
                Follow-up Date
              </h3>
            </div>

            <p className="text-slate-600">
              {prescription.followUpDate
                ? new Date(
                    prescription.followUpDate
                  ).toLocaleDateString()
                : "Not specified"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Close
          </button>

          <button
            onClick={() => onUseTemplate?.(prescription)}
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            <ContentCopyRoundedIcon fontSize="small" />
            Use as Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionHistoryModal;