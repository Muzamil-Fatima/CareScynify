import React from "react";
import { DollarSign, Clock, Edit, Trash2 } from "lucide-react";
import LabTestsFooter from "./LabTestsFooter";

export default function LabTestsTable({
  filteredTests = [],
  handleDeleteTest,
  handleEditTest,
}) {
  return (
    <div className="lg:col-span-2 rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col justify-between">
      <div>
        <div className="p-5 bg-linear-to-r from-violet-50 to-fuchsia-50 border-b border-violet-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800">
            Active Lab Menu Pricing ({filteredTests.length})
          </h3>

          <span className="text-[10px] bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-violet-200">
            Live Catalog
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-violet-100">
                <th className="p-4 pl-6">Code</th>
                <th className="p-4">Test Specification</th>
                <th className="p-4">Rate / Cost</th>
                <th className="p-4">TAT (Reporting)</th>
                <th className="p-4 text-center pr-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-violet-100 text-sm text-slate-700">
              {filteredTests.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    No laboratory tests found.
                  </td>
                </tr>
              ) : (
                filteredTests.map((test) => (
                  <tr
                    key={test._id}
                    className="hover:bg-violet-50/70 transition-all duration-300"
                  >
                    <td className="p-4 pl-6">
                      <span className="font-mono font-bold text-violet-700">
                        {test.code}
                      </span>
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
                        <span>{Number(test.price).toLocaleString()}</span>
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
                          onClick={() => handleEditTest(test)}
                          className="rounded-xl p-2 text-violet-600 hover:bg-violet-100 transition-all duration-300"
                        >
                          <Edit size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTest(test._id)}
                          className="rounded-xl p-2 text-red-500 hover:bg-red-100 transition-all duration-300"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <LabTestsFooter />
    </div>
  );
}
