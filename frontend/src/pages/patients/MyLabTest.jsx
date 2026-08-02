import React, { useEffect } from "react";
import {
  FlaskConical,
  Calendar,
  FileText,
  CircleDot,
  ArrowRight,
} from "lucide-react";
import useMyLabTests from "../../hooks/laboratory/useMyLabTests";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const priorityColor = {
  Normal: "bg-gray-100 text-gray-700",
  High: "bg-orange-100 text-orange-700",
  Urgent: "bg-red-100 text-red-700",
};

const MyLabTest = () => {
  const { loading, myLabTests, fetchMyLabTests } = useMyLabTests();

  useEffect(() => {
    fetchMyLabTests();
  }, [fetchMyLabTests]);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading laboratory tests...
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Laboratory Tests
          </h1>

          <p className="text-gray-500 mt-2">
            View all your laboratory samples and reports.
          </p>
        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-6">
          {myLabTests.map((sample) => (
            <div
              key={sample._id}
              className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Top */}

              <div className="flex justify-between items-center px-6 py-5 bg-linear-to-r from-violet-50 via-white to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200">
                    <FlaskConical className="text-violet-600" size={22} />
                  </div>

                  <div>
                    <h2 className="font-bold text-lg">{sample.sampleId}</h2>

                    <p className="text-gray-500 text-sm">Laboratory Sample</p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColor[sample.sampleStatus]
                  }`}
                >
                  {sample.sampleStatus}
                </span>
              </div>

              {/* Body */}

              <div className="p-5 space-y-5">
                {/* Test */}

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Tests</h3>

                  <div className="space-y-3">
                    {sample.tests.map((test, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:bg-white hover:shadow-md transition-all duration-300"
                      >
                        <div>
                          <h4 className="font-semibold">{test.testName}</h4>

                          <p className="text-sm text-gray-500">
                            PKR {test.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CircleDot size={18} />

                    <div>
                      <p className="text-xs text-gray-500">Priority</p>

                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                          priorityColor[sample.priority]
                        }`}
                      >
                        {sample.priority}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />

                    <div>
                      <p className="text-xs text-gray-500">Date</p>

                      <p className="font-medium">
                        {new Date(sample.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div className="px-6 py-5 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {sample.reportId ? "Report Available" : "Report Pending"}
                </div>

                {sample.reportId && (
                  <button className="flex items-center gap-2 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-5 py-3 rounded-2xl font-medium shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <FileText size={18} />
                    View Report
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}

        {!loading && myLabTests.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <FlaskConical className="mx-auto text-violet-500 mb-4" size={60} />

            <h2 className="text-2xl font-bold mb-2">No Tests Found</h2>

            <p className="text-gray-500">
              You don't have any laboratory tests yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLabTest;
