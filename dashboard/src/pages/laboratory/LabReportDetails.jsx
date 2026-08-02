import "./LabReportDetails.css";
import React, { useEffect } from "react";
import {
  Building2,
  User,
  FlaskConical,
  Calendar,
  ClipboardCheck,
  Printer,
} from "lucide-react";
import { useParams } from "react-router-dom";
import useLabReports from "../../hooks/laboratory/useLabReport";

export default function LabReportDetails() {
  const { reportId } = useParams();

  const downloadPDF = () => {
    window.print();
  };
  const { selectedReport, fetchLabReportById, loading } = useLabReports();

  useEffect(() => {
    if (reportId) {
      fetchLabReportById(reportId);
    }
  }, [reportId, fetchLabReportById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Report...
      </div>
    );
  }

  if (!selectedReport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Report not found.
      </div>
    );
  }

  const report = selectedReport;

  return (
    <div
      id="report-content"
      className="report-content min-h-screen bg-gray-100 py-8 px-5"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}

        <div className="flex justify-between items-start border-b border-gray-300 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">
              Laboratory Report
            </h1>

            <p className="text-gray-500 mt-2">Report ID : {report.reportId}</p>
          </div>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl"
          >
            <Printer size={18} />
            Download pdf
          </button>
        </div>

        {/* Information */}

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Building2 className="text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Laboratory</p>
                <h3 className="font-semibold">
                  {report.laboratoryId?.labName || "CareScynify Laboratory"}
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <User className="text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Patient</p>
                <h3 className="font-semibold">{report.labPatientId?.name || report.patientId?.userId?.name|| "Unknown Patient"}</h3>
              </div>
            </div>

            <div className="flex gap-3">
              <FlaskConical className="text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Sample ID</p>
                <h3 className="font-semibold">{report.sampleId?.sampleId}</h3>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Calendar className="text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Date</p>
                <h3 className="font-semibold">
                  {new Date(report.createdAt).toLocaleDateString()}
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <ClipboardCheck className="text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <h3 className="font-semibold text-green-600">
                  {report.reportStatus}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}

        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Test Results</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Parameter</th>

                  <th className="px-4 py-3 text-left">Value</th>

                  <th className="px-4 py-3 text-left">Unit</th>

                  <th className="px-4 py-3 text-left">Reference Range</th>

                  <th className="px-4 py-3 text-left">Remarks</th>
                </tr>
              </thead>

              <tbody>
                {report.results?.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{item.parameter}</td>

                    <td className="px-4 py-3 font-semibold">{item.value}</td>

                    <td className="px-4 py-3">{item.unit}</td>

                    <td className="px-4 py-3">{item.referenceRange}</td>

                    <td className="px-4 py-3">{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overall Remarks */}

        <div className="mt-8">
          <h2 className="font-bold text-gray-800 mb-3">Overall Remarks</h2>

          <div className="bg-gray-50 border  border-gray-300 rounded-xl p-5">
            {report.overallRemarks || "No remarks available."}
          </div>
        </div>

        {/* Footer */}

        <div className="border-t border-gray-300 mt-10 pt-8 flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Verified By</p>

            <h3 className="font-semibold">
              {report.verifiedBy?.name || "Laboratory Staff"}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">CareScynify Laboratory</p>

            <p className="text-sm text-gray-400">Computer Generated Report</p>
          </div>
        </div>
      </div>
    </div>
  );
}
