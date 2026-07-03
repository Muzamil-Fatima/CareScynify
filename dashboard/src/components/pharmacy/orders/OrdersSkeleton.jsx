import React from "react";

const OrdersSkeleton = ({ rows = 6 }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              {[
                "Order ID",
                "Patient",
                "Items",
                "Amount",
                "Status",
                "Date",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {/* Skeleton Rows */}
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="border-t">
                {/* Order ID */}
                <td className="px-6 py-4">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </td>

                {/* Patient */}
                <td className="px-6 py-4">
                  <div className="h-4 w-36 rounded bg-gray-200" />
                </td>

                {/* Items */}
                <td className="px-6 py-4">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </td>

                {/* Amount */}
                <td className="px-6 py-4">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="h-8 w-24 rounded-full bg-gray-200" />
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-9 w-20 rounded-lg bg-gray-200" />
                    <div className="h-9 w-20 rounded-lg bg-gray-200" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSkeleton;