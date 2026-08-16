import React from "react";
import { usePatient } from "../../../../context/patients/PatientContext";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

const ReportsTab = () => {
  const { reports = [], loading } = usePatient();

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleViewReport = (report) => {
    const fileUrl = report.fileUrl || report.pdfUrl;

    if (!fileUrl) {
      console.error("Report URL is missing:", report);
      return;
    }

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadReport = (report) => {
    const fileUrl = report.fileUrl || report.pdfUrl;

    if (!fileUrl) {
      console.error("Report URL is missing:", report);
      return;
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = report.title || "medical-report.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  return (
    <div className="space-y-5">
      {reports.length > 0 ? (
        reports.map((report) => (
          <div
            key={report._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
                  <DescriptionRoundedIcon className="text-violet-600" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {report.title || "Untitled Report"}
                  </h2>

                  <div className="flex flex-wrap gap-5 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CategoryRoundedIcon fontSize="small" />
                      {report.category || "Other"}
                    </div>

                    <div className="flex items-center gap-1">
                      <CalendarTodayRoundedIcon fontSize="small" />
                      {formatDate(report.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  report.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {report.status || "Processing"}
              </span>
            </div>

            {/* AI Explanation */}
            {report.explanation?.trim() && (
              <div className="mt-6 border-t pt-5">
                <h3 className="font-semibold text-gray-700 mb-2">
                  AI Explanation
                </h3>

                <p className="text-gray-600 leading-7 whitespace-pre-line">
                  {report.explanation}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              {/* VIEW */}
              <button
                onClick={() => handleViewReport(report)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 transition"
              >
                <VisibilityRoundedIcon fontSize="small" />
                View
              </button>

              {/* DOWNLOAD */}
              <button
                onClick={() => handleDownloadReport(report)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
              >
                <DownloadRoundedIcon fontSize="small" />
                Download
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <DescriptionRoundedIcon
            sx={{ fontSize: 70 }}
            className="text-gray-300 mx-auto"
          />

          <h2 className="mt-5 text-2xl font-semibold text-gray-800">
            No Reports Found
          </h2>

          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            This patient has not uploaded any medical reports yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsTab;