import React from "react";

import OrderRow from "./OrderRow";

const OrdersTable = ({
  orders = [],
  onView,
  onUpdateStatus,
  onCancel,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Patient
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Items
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onView={onView}
                onUpdateStatus={onUpdateStatus}
                onCancel={onCancel}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;