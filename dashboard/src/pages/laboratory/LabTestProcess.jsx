import React, { useEffect } from "react";
import { Play, CheckCircle2, FileText } from "lucide-react";
import useLabSample from "../../hooks/laboratory/useLabSamples";
import { useNavigate } from "react-router-dom";
export default function LabTestProcess() {
  const { samples, fetchLabSamples, changeSampleStatus } = useLabSample();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLabSamples();
  }, [fetchLabSamples]);

  const steps = ["Sample Received", "Preparation", "Running", "Verification"];

  const statusSequence = ["Pending", "Collected", "Processing", "Completed"];

  const statusToStage = {
    Pending: 1,
    Collected: 2,
    Processing: 3,
    Completed: 4,
    Rejected: 0,
  };

  const getNextStatus = (current) => {
    const currentIndex = statusSequence.indexOf(current);
    if (currentIndex === -1 || currentIndex === statusSequence.length - 1) {
      return current; // already at last step, or invalid/rejected status
    }
    return statusSequence[currentIndex + 1];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Test Process</h2>
          <p className="text-gray-500 mt-1">
            Track and manage laboratory testing workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {samples?.map((t) => {
            const stage = statusToStage[t.sampleStatus] || 0;
            const nextStatus = getNextStatus(t.sampleStatus);

            return (
              <div
                key={t._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-md p-6"
              >
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {t.patientName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.tests?.map((test) => test.testName).join(", ")} •{" "}
                      {t.sampleId}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-purple-700">
                      {t.sampleStatus}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.sampleStatus === "Completed"
                        ? "Finished"
                        : "Processing"}
                    </p>
                  </div>
                </div>

                <div className="relative mb-8 px-2">
                  <div className="absolute top-3 left-6 right-6 h-0.5 bg-gray-200"></div>
                  <div className="relative flex justify-between">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                            idx < stage
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "bg-gray-100 border-gray-300"
                          }`}
                        >
                          {idx < stage ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          )}
                        </div>
                        <span
                          className={`mt-3 text-[10px] font-medium text-center ${
                            idx < stage ? "text-purple-700" : "text-gray-500"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {t.sampleStatus === "Completed" ? (
                    t.reportId ? (
                      <button
                        onClick={() => navigate(`/lab/reports/${t.reportId}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition cursor-pointer"
                      >
                        <FileText size={16} />
                        View Report
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/lab/reports/create/${t._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
                      >
                        <FileText size={16} />
                        Create Report
                      </button>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => changeSampleStatus(t._id, nextStatus)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
                      >
                        <Play size={16} />
                        Move to {nextStatus}
                      </button>

                      <button
                        onClick={() => changeSampleStatus(t._id, "Completed")}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-purple-50 transition"
                      >
                        Complete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
