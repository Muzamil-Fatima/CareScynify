import React, { useEffect } from "react";

const StatusToast = ({ status, onClose }) => {
  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [status, onClose]);

  if (!status) return null;

  const styles = {
    uploading: "bg-blue-600",
    processing: "bg-purple-600",
    done: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div
        className={`
          ${styles[status.type]} 
          text-white px-4 py-3 rounded-xl shadow-lg 
          flex items-center gap-3 min-w-[220px]
          animate-fade-in
        `}
      >
        {/* Spinner only for processing */}
        {status.type === "processing" && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        {/* Icon dots for upload/done */}
        {status.type === "uploading" && (
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        )}

        {status.type === "done" && (
          <div className="w-2 h-2 bg-white rounded-full"></div>
        )}

        <span className="text-sm font-medium">
          {status.message}
        </span>
      </div>
    </div>
  );
};

export default StatusToast;