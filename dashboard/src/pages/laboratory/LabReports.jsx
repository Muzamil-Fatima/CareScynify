import React, { useEffect } from "react";
import {
  FileText,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import useLabReport from "../../hooks/laboratory/useLabReport";
import { useNavigate } from "react-router-dom";
export default function LabReports() {
  const { reports, loading, fetchLabReports, deleteReport } = useLabReport();
  const navigate = useNavigate();
  useEffect(() => {
    fetchLabReports();
  }, [fetchLabReports]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Laboratory Reports
            </h1>

            <p className="text-gray-500 mt-1">
              View and manage generated laboratory reports.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow px-6 py-4">
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-2xl font-bold text-purple-600">
              {reports.length}
            </p>
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            Loading reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow">
            <ClipboardList className="mx-auto text-gray-300 mb-4" size={70} />

            <h2 className="text-xl font-semibold text-gray-700">
              No Reports Found
            </h2>

            <p className="text-gray-500 mt-2">
              Reports will appear here after they are generated.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {report.labPatientId?.name ||
                         report.patientId?.userId?.name ||
                        "Unknown Patient"}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Sample : {report.sampleId?.sampleId}
                    </p>

                    <p className="text-sm text-gray-500">
                      Report : {report.reportId}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      report.reportStatus,
                    )}`}
                  >
                    {report.reportStatus}
                  </span>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Results</span>

                    <span className="font-semibold text-gray-800">
                      {report.results?.length || 0} Parameters
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created</span>

                    <span className="font-semibold text-gray-700">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => navigate(`/lab/reports/${report._id}`)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-3 transition cursor-pointer"
                  >
                    <Eye size={18} />
                    View Report
                  </button>

                  <button className="flex items-center justify-center rounded-xl border border-purple-200 hover:bg-purple-50 p-3 transition">
                    <Pencil size={18} className="text-purple-600" />
                  </button>

                  <button
                    onClick={() => deleteReport(report._id)}
                    className="flex items-center justify-center rounded-xl border border-red-200 hover:bg-red-50 p-3 transition"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>

                {report.reportStatus === "Verified" && (
                  <div className="mt-5 flex items-center gap-2 text-green-600 text-sm font-medium">
                    <CheckCircle2 size={16} />
                    Verified Report
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
