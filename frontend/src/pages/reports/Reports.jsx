import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddIcon from "@mui/icons-material/Add";
import {toast} from "react-toastify";
import { reportsData } from "../../data/reportData";
import { reportCategories } from "./reportCategories";
const Reports = () => {
  const [activeTab, setActiveTab] = useState("Lab");

  const filteredReports = reportsData.filter((r) => r.category === activeTab);
  // function download file
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

        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition">
          <AddIcon fontSize="small" />
          Add Report
        </button>
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
                <b>Category:</b> {report.category}
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
    </div>
  );
};

export default Reports;
