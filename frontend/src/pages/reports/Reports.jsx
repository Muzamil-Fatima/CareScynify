import React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Blood Test Report",
      doctor: "Dr. Ahmed Khan",
      date: "2026-04-10",
      status: "Normal",
    },
    {
      id: 2,
      title: "X-Ray Chest Report",
      doctor: "Dr. Sarah Ali",
      date: "2026-03-28",
      status: "Pending",
    },
    {
      id: 3,
      title: "MRI Brain Scan",
      doctor: "Dr. Usman Tariq",
      date: "2026-02-15",
      status: "Critical",
    },
  ];

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

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Medical Reports
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
          >

            {/* Top */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <DescriptionOutlinedIcon className="text-purple-600" />
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {report.title}
              </h2>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Doctor:</span> {report.doctor}
              </p>
              <p>
                <span className="font-medium">Date:</span> {report.date}
              </p>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center mt-4">

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  report.status
                )}`}
              >
                {report.status}
              </span>

              {/* Download */}
              <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-sm">
                <DownloadOutlinedIcon fontSize="small" />
                Download
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Reports;