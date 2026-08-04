import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import UploadReportModal from "../../components/reports/UploadReportModal";
import ReportCard from "../../components/reports/ReportCard";
import ReportTabs from "../../components/reports/ReportTabs";

import { addReport, getReports } from "../../api/reportApi";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("All Reports");
  const [openModal, setOpenModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const queryClient = useQueryClient();
const {
  data,
  isLoading,
  error,
} = useQuery({
  queryKey: ["reports"],
  queryFn: getReports,
  staleTime: 0,
  refetchOnWindowFocus: true,
});


const reports = [
  ...(data?.reports || []),
  ...(data?.labReports || []),
];

  // LOADING STATE
  if (isLoading) {
    return <div className="p-6">Loading reports...</div>;
  }

  // ERROR STATE
  if (error) {
    return <div className="p-6">Failed to load reports</div>;
  }

  // FILTER REPORTS
 const filteredReports =
  activeTab === "All Reports"
    ? reports
    : activeTab === "Lab Reports"
    ? reports.filter((report) => report.pdfUrl)
    : activeTab === "Uploaded Reports"
    ? reports.filter((report) => report.fileUrl)
    : activeTab === "Doctor Prescriptions"
    ? reports.filter(
        (report) => report.category === "Prescription"
      )
    : [];

  // DOWNLOAD REPORT
const handleDownload = (report) => {
  const url = report.fileUrl || report.pdfUrl;

  if (!url) return;

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";

  document.body.appendChild(link);
  link.click();
  link.remove();
};

  // UPLOAD REPORT
  const handleUpload = async (file, category) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG, PNG allowed");
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("File size exceeds 10MB");
      return;
    }

    try {
      setUploadStatus({
        type: "uploading",
        message: "Uploading report...",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      await addReport(formData);

      // Refresh reports after upload
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });

      setUploadStatus({
        type: "done",
        message: "Report uploaded successfully",
      });

      toast.success("Report uploaded");
    } catch (error) {
      console.log(error);

      setUploadStatus({
        type: "error",
        message: "Upload failed",
      });

      toast.error("Upload failed");
    }

    setTimeout(() => {
      setUploadStatus(null);
    }, 3000);
  };

  // STATUS COLORS
  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Failed":
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
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          <AddIcon fontSize="small" />
          Add Report
        </button>
      </div>

      {/* MODAL */}
      <UploadReportModal
        open={openModal}
        setOpen={setOpenModal}
        handleUpload={handleUpload}
      />

      {/* TABS */}
      <ReportTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* REPORT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
              getStatusStyle={getStatusStyle}
              onClick={() => handleDownload(report)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No reports found
          </div>
        )}
      </div>

      {/* UPLOAD STATUS */}
      {uploadStatus && (
        <div className="fixed bottom-5 left-5 z-50">
          <div className="bg-purple-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            {uploadStatus.type === "uploading" && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}

            <span>{uploadStatus.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
