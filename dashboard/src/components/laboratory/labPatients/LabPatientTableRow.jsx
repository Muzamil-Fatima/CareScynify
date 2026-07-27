import React from "react";
import { Edit, Trash2 } from "lucide-react";

export default function LabPatientTableRow({
  patient,
  handleDeletePatient,
  handleEditPatient,
}) {
  return (
    <tr className="hover:bg-violet-50/60 transition-all duration-300">
      {/* ID */}
      <td className="px-6 py-5">
        <span className="font-bold text-violet-700">
          {patient?._id?.slice(-6)}
        </span>
      </td>

      {/* Patient Info */}
      <td className="px-6 py-5">
        <div>
          <h4 className="font-semibold text-slate-800">
            {patient?.name || "N/A"}
          </h4>

          <p className="text-xs text-slate-500 mt-1">
            {patient?.gender || "N/A"}
          </p>
        </div>
      </td>

      {/* Mobile */}
      <td className="px-6 py-5 text-slate-600 font-medium">
        {patient?.mobile || "N/A"}
      </td>

      {/* Test */}
      <td className="px-6 py-5">
        <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          {patient?.testId?.name || "N/A"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            onClick={() => handleEditPatient(patient)}
            className="p-2 rounded-xl text-violet-600 hover:bg-violet-100 transition-all duration-300"
          >
            <Edit size={16} />
          </button>

          <button
            type="button"
            onClick={() => handleDeletePatient(patient._id)}
            className="p-2 rounded-xl text-red-500 hover:bg-red-100 transition-all duration-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
