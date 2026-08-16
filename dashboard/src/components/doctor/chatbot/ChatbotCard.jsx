import React from "react";
import { FileText, Trash2, CheckCircle, Clock, Eye } from "lucide-react";

const Chatbot = ({
  file,
  onDelete,
  onView,
}) => {
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const getStatusIcon = () => {
    if (file?.status === "processing") {
      return <Clock className="h-3.5 w-3.5" />;
    }

    return <CheckCircle className="h-3.5 w-3.5" />;
  };

  const getStatusText = () => {
    if (file?.status === "processing") {
      return "Processing";
    }

    if (file?.status === "failed") {
      return "Failed";
    }

    return "Ready";
  };

  const getStatusClass = () => {
    if (file?.status === "processing") {
      return "text-amber-600";
    }

    if (file?.status === "failed") {
      return "text-red-600";
    }

    return "text-green-600";
  };

  return (
    <div className="group flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-gray-50">
      {/* Left Side */}
      <div className="flex min-w-0 items-center gap-4">
        {/* PDF Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <FileText className="h-5 w-5 text-red-500" />
        </div>

        {/* File Information */}
        <div className="min-w-0">
          <h3
            className="truncate text-sm font-semibold text-gray-900"
            title={file?.title}
          >
            {file?.title || "Untitled Document"}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>{formatFileSize(file?.fileSize)}</span>

            <span>•</span>

            <span className={`flex items-center gap-1 ${getStatusClass()}`}>
              {getStatusIcon()}
              {getStatusText()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        {/* View */}
        {onView && (
          <button
            type="button"
            onClick={() => onView(file)}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
            title="View document"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}

        {/* Delete */}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(file)}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
            title="Delete document"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;