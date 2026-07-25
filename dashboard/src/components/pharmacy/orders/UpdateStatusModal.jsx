import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled",
];

const UpdateStatusModal = ({ isOpen, order, onClose, onSave }) => {
  const [status, setStatus] = useState(() => order?.orderStatus || "");

  if (!isOpen || !order) return null;

  const handleSave = () => {
    if (!status) return;

    onSave(order, status);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Update Order Status
            </h2>

            <p className="text-sm text-gray-500">#{order.orderId}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Preview */}
          <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
            Current: <span className="font-semibold">{order.orderStatus}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700"
          >
            <CheckCircleRoundedIcon fontSize="small" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
