import React from "react";
import useLabDashboard from "../../../hooks/laboratory/useLabDashboard";

const RecentSamples = () => {
  const { recentSamples } = useLabDashboard();

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Collected":
        return "bg-purple-100 text-purple-700";

      case "Processing":
        return "bg-indigo-100 text-indigo-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-5">
        Recent Samples
      </h2>

      <div className="space-y-4">
        {recentSamples?.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-3"
          >
            <div>
              <p className="font-semibold">
                {
                  item.labPatientId?.name ||
                  item.patientId?.userId?.name ||
                  "Unknown Patient"
                }
              </p>

              <p className="text-sm text-gray-500">
                {item.sampleId} •{" "}
                {item.tests
                  ?.map((test) => test.testName)
                  .join(", ")}
              </p>
            </div>


            <span
              className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusColor(
                item.sampleStatus
              )}`}
            >
              {item.sampleStatus}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSamples;