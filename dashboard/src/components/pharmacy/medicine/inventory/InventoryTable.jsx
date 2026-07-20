import React from "react";

import InventoryRow from "./InventoryRow";
const InventoryTable = ({ medicines = [], onView, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 scrollbar-thin">
      <table className="w-full table-fixed">
        {/* Table Header */}
        <thead className="bg-slate-100">
          <tr className="text-left text-sm font-semibold text-slate-700">
            <th className="px-3 py-3 text-xs font-semibold">Medicine</th>
            <th className="px-3 py-3 text-xs font-semibold">Category</th>
            <th className="px-3 py-3 text-xs font-semibold">Price</th>
            <th className="px-3 py-3 text-xs font-semibold">Stock</th>
            <th className="px-3 py-3 text-xs font-semibold">Expiry</th>
            <th className="px-3 py-3 text-xs font-semibold">Manufacturer</th>
            <th className="px-3 py-3 text-xs font-semibold">Status</th>
            <th className="px-3 py-3 text-xs font-semibold text-center">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-200 bg-white">
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <InventoryRow
                key={medicine._id}
                medicine={medicine}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-12 text-center text-slate-500">
                No medicines found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
