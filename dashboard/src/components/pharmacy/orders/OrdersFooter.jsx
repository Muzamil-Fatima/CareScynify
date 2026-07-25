import React from "react";

const OrdersFooter = ({
  currentPage = 1,
  itemsPerPage = 10,
  totalOrders = 0,
}) => {
  const start = totalOrders === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const end = Math.min(currentPage * itemsPerPage, totalOrders);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{start}</span>
        {" - "}
        <span className="font-semibold text-gray-900">{end}</span>
        {" of "}
        <span className="font-semibold text-gray-900">{totalOrders}</span>
        {" Orders"}
      </p>
    </div>
  );
};

export default OrdersFooter;
