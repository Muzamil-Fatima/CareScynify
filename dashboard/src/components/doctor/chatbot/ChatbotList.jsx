import React from "react";
import Chatbot from "./ChatbotCard";
import { FileText } from "lucide-react";

const ChatbotList = ({
  files = [],
  onDelete,
  onView,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Your Documents
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {files.length}{" "}
            {files.length === 1 ? "document" : "documents"} in your knowledge
            base
          </p>
        </div>
      </div>

      {/* Empty State */}
      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <FileText className="h-7 w-7 text-gray-400" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            No documents yet
          </h3>

          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Upload medical PDF documents to build your personal AI knowledge
            base.
          </p>
        </div>
      )}

      {/* Document List */}
      {files.length > 0 && (
        <div className="divide-y divide-gray-100">
          {files.map((file, index) => (
            <Chatbot
              key={file._id || file.id || `${file.name}-${index}`}
              file={file}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatbotList;