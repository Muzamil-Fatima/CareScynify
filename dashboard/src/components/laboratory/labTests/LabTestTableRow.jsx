import React from "react";
import { DollarSign, Clock, Edit, Trash2 } from "lucide-react";

export default function LabTestTableRow({ test, handleDeleteTest }) {
  return (
    <tr className="hover:bg-violet-50/70 transition-all duration-300">
      <td className="p-4 pl-6">
        <span className="font-mono font-bold text-violet-700">{test.code}</span>
      </td>

      <td className="p-4">
        <div>
          <span className="block text-[13px] font-bold text-slate-800">
            {test.name}
          </span>

          <span className="mt-1 inline-block rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700 border border-violet-200">
            {test.category}
          </span>
        </div>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-1 font-bold text-slate-800">
          <DollarSign size={14} className="text-violet-500" />
          <span>{test.price.toLocaleString()}</span>
        </div>
      </td>

      <td className="p-4">
        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">
          <Clock size={13} className="mr-1" />
          {test.turnAround}
        </span>
      </td>

      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() =>
              alert(`Edit config options for ${test.code} coming soon!`)
            }
            className="rounded-xl p-2 text-violet-600 hover:bg-violet-100 transition-all duration-300"
          >
            <Edit size={15} />
          </button>

          <button
            type="button"
            onClick={() => handleDeleteTest(test.code)}
            className="rounded-xl p-2 text-red-500 hover:bg-red-100 transition-all duration-300"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
