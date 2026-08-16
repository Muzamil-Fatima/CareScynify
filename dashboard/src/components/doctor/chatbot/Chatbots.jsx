import React, { useRef, useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  CheckCircle,
  CloudUpload,
} from "lucide-react";

const Chatbot = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (selectedFiles) => {
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf"
    );

    setFiles((prev) => [...prev, ...pdfFiles]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDelete = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 KB";

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Medical Knowledge Base
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Upload medical documents to help your AI assistant understand your
            medical knowledge.
          </p>
        </div>

        {/* Upload Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Upload Medical Documents
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Only PDF files are supported.
            </p>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <CloudUpload className="h-7 w-7 text-blue-600" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-900">
              Drag & Drop your PDF here
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              or click to browse from your computer
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Upload className="h-4 w-4" />
              Choose PDF
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Your Documents
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {files.length} {files.length === 1 ? "document" : "documents"}{" "}
                uploaded
              </p>
            </div>
          </div>

          {/* Empty State */}
          {files.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <FileText className="h-7 w-7 text-gray-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                No documents yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Upload your first medical PDF to build your knowledge base.
              </p>
            </div>
          )}

          {/* Document List */}
          {files.length > 0 && (
            <div className="divide-y divide-gray-100">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between px-6 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {/* File Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50">
                      <FileText className="h-5 w-5 text-red-500" />
                    </div>

                    {/* File Info */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {file.name}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                        <span>{formatFileSize(file.size)}</span>

                        <span>•</span>

                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="ml-4 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    title="Delete document"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;