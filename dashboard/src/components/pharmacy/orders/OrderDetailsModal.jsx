import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Order Details
            </h2>
            <p className="text-sm text-gray-500">
              #{order._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">

          {/* Patient Info */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              Patient Information
            </h3>

            <p className="text-gray-700">
              <span className="font-medium">Name:</span>{" "}
              {order.patient?.name}
            </p>

            <p className="text-gray-700">
              <span className="font-medium">Phone:</span>{" "}
              {order.patient?.phone || "N/A"}
            </p>
          </div>

          {/* Medicine List */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              Medicine List
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-sm">Medicine</th>
                    <th className="p-3 text-sm">Qty</th>
                    <th className="p-3 text-sm">Price</th>
                    <th className="p-3 text-sm">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3">
                        {item.medicine}
                      </td>

                      <td className="p-3">
                        {item.quantity}
                      </td>

                      <td className="p-3">
                        Rs. {item.price}
                      </td>

                      <td className="p-3 font-medium">
                        Rs. {item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delivery + Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="rounded-xl border p-4">
              <h3 className="mb-2 font-semibold text-gray-800">
                Delivery Address
              </h3>
              <p className="text-gray-700">
                {order.deliveryAddress || "Not provided"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <h3 className="mb-2 font-semibold text-gray-800">
                Payment Method
              </h3>
              <p className="text-gray-700">
                {order.paymentMethod || "Cash"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-2 font-semibold text-gray-800">
              Notes
            </h3>
            <p className="text-gray-700">
              {order.notes || "No notes"}
            </p>
          </div>

          {/* Total + Status */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border p-4 bg-gray-50">
            
            <div>
              <p className="text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                Rs. {order.totalAmount}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Status</p>
              <p className="text-lg font-semibold text-blue-600">
                {order.status}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;