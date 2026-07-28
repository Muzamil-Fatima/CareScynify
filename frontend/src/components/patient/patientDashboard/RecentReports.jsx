import React from "react";
import { useNavigate } from "react-router-dom";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const RecentReports = () => {
  const navigate = useNavigate();

  // Replace with backend data later
  const reports = [
    {
      id: 1,
      title: "Blood Test Report",
      date: "25 Jun 2026",
    },
    {
      id: 2,
      title: "MRI Scan Report",
      date: "18 Jun 2026",
    },
    {
      id: 3,
      title: "X-Ray Chest Report",
      date: "10 Jun 2026",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Reports
          </h2>
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

      {/* Reports */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
                <PictureAsPdfRoundedIcon />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  {report.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <DescriptionRoundedIcon sx={{ fontSize: 16 }} />
                  Uploaded on {report.date}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/report-viewer")}
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-xl transition"
            >
              <VisibilityRoundedIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;