import React from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const CancelOrderModal = ({
  isOpen,
  order,
  onClose,
  onConfirm,
  reason,
  setReason,
}) => {
  if (!isOpen || !order) return null;

  const handleConfirm = () => {
    onConfirm();
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <WarningAmberRoundedIcon className="text-red-500" />

            <h2 className="text-lg font-bold text-gray-900">Cancel Order?</h2>
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
          <p className="text-gray-600">
            This action cannot be undone. Are you sure you want to cancel order{" "}
            <span className="font-semibold">#{order.orderId}</span>?
          </p>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Reason (optional)
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Write cancellation reason..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
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
            onClick={handleConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
