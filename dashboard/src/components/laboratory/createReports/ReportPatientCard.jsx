import React from "react";
import {
  User,
  TestTube,
  FileText,
  CalendarDays,
  Activity,
  BadgeCheck,
} from "lucide-react";

const ReportPatientCard = ({ report }) => {
  if (!report) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-gray-500">
        No report data available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-violet-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Patient Information
        </h2>
        <p className="text-purple-100 text-sm mt-1">
          Laboratory Report Details
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Patient Name */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-semibold text-gray-800">
                {report.patientName}
              </p>
            </div>
          </div>

          {/* Sample ID */}
          <div className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Sample ID</p>
              <p className="font-semibold text-gray-800">
                {report.sampleId}
              </p>
            </div>
          </div>

          {/* Report ID */}
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Report ID</p>
              <p className="font-semibold text-gray-800">
                {report.reportId || "Auto Generated"}
              </p>
            </div>
          </div>

          {/* Test Name */}
          <div className="flex items-start gap-3">
            <TestTube className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Test Name</p>
              <p className="font-semibold text-gray-800">
                {report.testName}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <CalendarDays className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-gray-800">
                {report.date}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <BadgeCheck className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Status</p>

              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {report.status}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReportPatientCard;