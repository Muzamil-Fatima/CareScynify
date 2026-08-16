import React, { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  Plus,
  CheckCircle,
  Loader2,
} from "lucide-react";

const ChatbotUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  
  // SELECT PDF
  

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);

    if (!files.length) return;

    const file = files[0];

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Only PDF files are allowed.");
      return;
    }

    setError("");
    setUploadProgress(0);
    setUploadSuccess(false);
    setSelectedFile(file);
  };

  
  // FILE INPUT CHANGE
  

  const handleFileChange = (event) => {
    handleFiles(event.target.files);

    // Allow selecting same file again
    event.target.value = "";
  };

  
  // REMOVE FILE
  

  const removeFile = () => {
    if (uploading) return;

    setSelectedFile(null);
    setError("");
    setUploadProgress(0);
    setUploadSuccess(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  
  // UPLOAD DOCUMENT
  

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF.");
      return;
    }

    if (!onUpload) {
      setError("Upload function is not available.");
      return;
    }

    try {
      setError("");
      setUploading(true);
      setUploadSuccess(false);
      setUploadProgress(0);

      /*
       * IMPORTANT:
       *
       * ChatbotUpload
       *      ↓
       * ChatbotProvider.uploadDocument()
       *      ↓
       * uploadChatbotDocument()
       *      ↓
       * Axios onUploadProgress
       *
       * Progress callback comes back here.
       */

      await onUpload(selectedFile, (progress) => {
        const safeProgress = Math.min(
          Math.max(Math.round(progress), 0),
          99
        );

        setUploadProgress(safeProgress);
      });

      /*
       * Backend successfully responded.
       *
       * Now we can safely show 100%.
       */

      setUploadProgress(100);
      setUploadSuccess(true);

      /*
       * Keep success visible for 1 second.
       */

      setTimeout(() => {
        setSelectedFile(null);
        setUploadProgress(0);
        setUploadSuccess(false);
        setUploading(false);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1000);
    } catch (error) {
      console.error("Chatbot document upload failed:", error);

      /*
       * IMPORTANT:
       *
       * Do NOT remove the selected file.
       * User can retry.
       */

      setUploading(false);
      setUploadSuccess(false);
      setUploadProgress(0);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Upload failed. Your document was not uploaded."
      );
    }
  };

  
  // FILE SIZE
  

  const totalMB = selectedFile
    ? selectedFile.size / (1024 * 1024)
    : 0;

  const uploadedMB =
    totalMB * (uploadProgress / 100);

  const remainingMB = Math.max(
    totalMB - uploadedMB,
    0
  );

  
  // UI
  

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      
          {/* HEADER */}
      

      <div className="flex items-center justify-between gap-4">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Upload Medical Documents
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload PDF documents to add them to your medical
            knowledge base.
          </p>
        </div>

        {/* TOP UPLOAD BUTTON */}

        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />

          Upload Document
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          hidden
          onChange={handleFileChange}
        />
      </div>

      
          {/* ERROR */}
      

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      )}

      
          {/* SELECTED FILE */}
      

      {selectedFile && (
        <div className="mt-5">

          {/* SECTION HEADER */}

          <div className="mb-2 flex items-center justify-between">

            <h3 className="text-sm font-semibold text-gray-900">
              {uploading
                ? "Uploading Document"
                : uploadSuccess
                ? "Upload Complete"
                : "Selected Document"}
            </h3>

            <span className="text-xs text-gray-500">
              1 file
            </span>

          </div>

          
              {/* FILE CARD */}
          

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">

            {/* FILE INFORMATION */}

            <div className="flex items-center justify-between">

              <div className="flex min-w-0 items-center gap-3">

                {/* PDF ICON */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
                  <FileText className="h-5 w-5 text-red-500" />
                </div>

                {/* FILE NAME */}

                <div className="min-w-0">

                  <p className="truncate text-sm font-medium text-gray-900">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {totalMB.toFixed(2)} MB
                  </p>

                </div>

              </div>

              {/* REMOVE */}

              {!uploading && !uploadSuccess && (
                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-3 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  title="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

            </div>

            
                {/* REAL UPLOAD PROGRESS */}
            

            {uploading && (
              <div className="mt-4">

                {/* PROGRESS HEADER */}

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <Loader2 className="h-4 w-4 animate-spin text-purple-600" />

                    <span className="text-xs font-medium text-gray-700">
                      {uploadProgress >= 100
                        ? "Upload complete"
                        : "Uploading..."}
                    </span>

                  </div>

                  <span className="text-xs font-semibold text-purple-600">
                    {uploadProgress}%
                  </span>

                </div>

                {/* PROGRESS BAR */}

                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">

                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-200"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />

                </div>

                {/* MB INFORMATION */}

                <div className="mt-2 flex items-center justify-between">

                  <span className="text-xs text-gray-500">
                    {uploadedMB.toFixed(2)} MB uploaded
                  </span>

                  <span className="text-xs text-gray-500">
                    {remainingMB.toFixed(2)} MB remaining
                  </span>

                </div>

              </div>
            )}

            
                {/* SUCCESS */}
            

            {uploadSuccess && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">

                <CheckCircle className="h-5 w-5" />

                Document uploaded successfully.

              </div>
            )}

          </div>

          
              {/* UPLOAD BUTTON */}
          

          {!uploading && !uploadSuccess && (
            <div className="mt-4 flex justify-end">

              <button
                type="button"
                onClick={handleUpload}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                <Upload className="h-4 w-4" />

                Upload Document
              </button>

            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ChatbotUpload;