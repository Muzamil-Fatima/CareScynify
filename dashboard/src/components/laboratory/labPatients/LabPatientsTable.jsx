import React from "react";
import LabPatientTableRow from "./LabPatientTableRow";

export default function LabPatientsTable({
  filteredPatients,
  handleDeletePatient,
}) {
  return (
    <div className="xl:col-span-2 rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col justify-between">
      <div>
        {/* Table Header */}
        <div className="px-6 py-5 border-b border-violet-100 bg-linear-to-r from-violet-50 to-fuchsia-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Active Patient Database
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {filteredPatients.length} Registered Patients
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold border border-violet-200">
            Live Sync
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-violet-50">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                  ID
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                  Patient
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-500">
                  Test
                </th>

                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-violet-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    Koi patient record nahi mila.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <LabPatientTableRow
                    key={patient.id}
                    patient={patient}
                    handleDeletePatient={handleDeletePatient}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-violet-100 bg-linear-to-r from-violet-50 to-white px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-slate-500">
          CareScynify Patient Module v1.2
        </span>

        <span className="text-xs font-medium text-violet-600">
          Laboratory Management System
        </span>
      </div>
    </div>
  );
}
