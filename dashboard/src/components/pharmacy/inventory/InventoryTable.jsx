import React from "react";

import InventoryRow from "./InventoryRow";

const InventoryTable = ({ medicines = [] }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full">
        {/* Table Header */}
        <thead className="bg-slate-100">
          <tr className="text-left text-sm font-semibold text-slate-700">
            <th className="px-6 py-4">Medicine</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4">Expiry</th>
            <th className="px-6 py-4">Manufacturer</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-200 bg-white">
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <InventoryRow
                key={medicine._id || medicine.id}
                medicine={medicine}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="py-12 text-center text-slate-500"
              >
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