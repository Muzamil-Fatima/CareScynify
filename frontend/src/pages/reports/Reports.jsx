import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { reportsData } from "../../data/reportData";
import { reportCategories } from "./reportCategories";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("Lab");
  const [openModel, setOpenModel] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [reports, setReports] = useState(reportsData);
  const filteredReports =
    activeTab === "All"
      ? reports
      : reports.filter((r) => r.category === activeTab);
  // DOWNLOAD FUNCTION
  const handleDownload = async (fileUrl, title) => {
    if (!fileUrl) {
      toast.error("No file available for this report");
      return;
    }

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("File not accessible");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = title || "report.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

  // UPLOAD + AI SIMULATION
  const handleUpload = async (file) => {
    if (!file) return;
    //  TYPE CHECK
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, PNG, JPG allowed");
      return;
    }

    // SIZE CHECK (10MB)
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("File too large (Max 10MB)");
      return;
    }
    const newReport = {
      id: Date.now(),
      title: file.name,
      doctor: "Pending AI...",
      date: new Date().toISOString().split("T")[0],
      category: "Pending",
      status: "Pending",
      fileUrl: URL.createObjectURL(file),
    };

    setReports((prev) => [newReport, ...prev]);

    setUploadStatus({
      type: "uploading",
      message: "Uploading report...",
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", newReport.id);

    // BACKEND api CALL
    const res = await fetch("/api/analyze-report", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setReports((prev) =>
      prev.map((r) =>
        r.id === newReport.id
          ? {
              ...r,
              doctor: data.doctor,
              category: data.category,
              status: data.status,
              title: data.title,
            }
          : r,
      ),
    );

    setUploadStatus({
      type: "done",
      message: "Report processed successfully!",
    });

    setTimeout(() => setUploadStatus(null), 2000);
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Medical Reports
        </h1>

        <button
          onClick={() => setOpenModel(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          <AddIcon fontSize="small" />
          Add Report
        </button>

        {/* MODAL */}
        {openModel && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Upload Report</h2>

              <p className="text-sm text-gray-500 mb-4">
                AI will automatically analyze and categorize this report.
              </p>

              {/* FILE INPUT */}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border p-2 rounded mb-4"
              />
              <p className="text-xs text-gray-400 mt-2">
                Supported: PDF, JPG, PNG (Max 10MB)
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenModel(false)}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setOpenModel(false);
                    if (file) handleUpload(file);
                  }}
                  className="px-4 py-2 rounded bg-purple-600 text-white"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-3 flex-wrap mb-6">
        {reportCategories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition
              ${
                activeTab === cat.name
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* TITLE */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <DescriptionOutlinedIcon className="text-purple-600" />
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {report.title}
              </h2>
            </div>

            {/* INFO */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <b>Doctor:</b> {report.doctor}
              </p>
              <p>
                <b>Date:</b> {report.date}
              </p>
              <p>
                <b>Category:</b>{" "}
                {report.category === "Pending"
                  ? "Analyzing..."
                  : report.category}
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  report.status,
                )}`}
              >
                {report.status}
              </span>

              <button
                onClick={() => handleDownload(report.fileUrl, report.title)}
                className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                <DownloadOutlinedIcon fontSize="small" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* STATUS TOAST (GOOGLE DRIVE STYLE) */}
      {uploadStatus && (
        <div className="fixed bottom-5 left-5 z-50">
          <div className="bg-purple-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            {uploadStatus.type === "processing" && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}

            <span className="text-sm font-medium">{uploadStatus.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
