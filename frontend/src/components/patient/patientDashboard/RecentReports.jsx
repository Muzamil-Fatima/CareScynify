import React from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { getReports } from "../../../api/reportApi";

const RecentReports = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Combine all backend reports
  const prescriptionsList = (data?.prescriptions || []).map((p) => ({
    ...p,
    category: "Prescription",
    title: p.prescriptionId || "Doctor Prescription",
    pdfUrl: p.pdfUrl,
    date: p.createdAt || p.updatedAt,
  }));

  const allReports = [
    ...(data?.reports || []),
    ...(data?.labReports || []),
    ...prescriptionsList,
  ];

  // Sort newest first and show only 3 recent reports
  const recentReports = [...allReports]
    .sort((a, b) => {
      const dateA = new Date(
        a.createdAt || a.uploadedAt || a.updatedAt || a.date || 0,
      );

      const dateB = new Date(
        b.createdAt || b.uploadedAt || b.updatedAt || b.date || 0,
      );

      return dateB - dateA;
    })
    .slice(0, 3);

  // Format backend date
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getReportTitle = (report) => {
    return (
      report.title ||
      report.name ||
      report.testName ||
      report.reportName ||
      report.prescriptionId ||
      "Medical Report"
    );
  };

  const getReportDate = (report) => {
    return (
      report.createdAt ||
      report.uploadedAt ||
      report.updatedAt ||
      report.date ||
      report.uploadDate ||
      null
    );
  };

  const handleViewReport = (report) => {
    const url = report.fileUrl || report.pdfUrl;

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    navigate("/report-viewer");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Reports</h2>

          <p className="text-sm text-gray-500 mt-1">
            Your latest medical documents
          </p>
        </div>

        <button
          onClick={() => navigate("/reports")}
          className="text-purple-600 font-semibold flex items-center gap-1"
        >
          View All
          <ArrowForwardRoundedIcon fontSize="small" />
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="py-8 text-center text-gray-500">Loading reports...</div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="py-8 text-center text-gray-500">
          Failed to load reports
        </div>
      )}

      {/* Reports */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {recentReports.length > 0 ? (
            recentReports.map((report, index) => (
              <div
                key={report._id || report.id || `${report.category}-${index}`}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* PDF Icon */}
                  <div className="bg-red-100 text-red-600 p-3 rounded-2xl shrink-0">
                    <PictureAsPdfRoundedIcon />
                  </div>

                  {/* Report Information */}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {getReportTitle(report)}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <DescriptionRoundedIcon sx={{ fontSize: 16 }} />

                      <span>
                        Uploaded on {formatDate(getReportDate(report))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* View */}
                <button
                  onClick={() => handleViewReport(report)}
                  className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-xl transition shrink-0 ml-3 cursor-pointer"
                >
                  <VisibilityRoundedIcon />
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No reports found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentReports;
