import React from "react";
import useLabDashboard from "../../../hooks/laboratory/useLabDashboard";

const SampleOverview = () => {
  const { stats } = useLabDashboard();

  const total =
    (stats?.pendingSamples || 0) +
    (stats?.processingSamples || 0) +
    (stats?.completedSamples || 0);

  const getPercentage = (value = 0) => {
    if (total === 0) return "0%";

    return `${Math.round((value / total) * 100)}%`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-5">Sample Status</h2>

      <div className="space-y-4">
        {/* Pending */}

        <div>
          <p>Pending ({stats?.pendingSamples || 0})</p>

          <div className="h-3 bg-yellow-100 rounded">
            <div
              className="h-3 bg-yellow-500 rounded"
              style={{
                width: getPercentage(stats?.pendingSamples),
              }}
            />
          </div>
        </div>

        {/* Processing */}

        <div>
          <p>Processing ({stats?.processingSamples || 0})</p>

          <div className="h-3 bg-purple-100 rounded">
            <div
              className="h-3 bg-purple-600 rounded"
              style={{
                width: getPercentage(stats?.processingSamples),
              }}
            />
          </div>
        </div>

        {/* Completed */}

        <div>
          <p>Completed ({stats?.completedSamples || 0})</p>

          <div className="h-3 bg-green-100 rounded">
            <div
              className="h-3 bg-green-600 rounded"
              style={{
                width: getPercentage(stats?.completedSamples),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleOverview;
