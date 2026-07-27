
import React, { useState } from "react";
import { ScanBarcode, CheckCircle } from "lucide-react";

const LabDashboard = () => {
  const [queue, setQueue] = useState([
    {
      id: "L2026-A12",
      patient: "Ali Khan",
      test: "CBC",
      priority: "Urgent",
      status: "Received",
    },
    {
      id: "L2026-A15",
      patient: "Fatima Z.",
      test: "Glucose",
      status: "In-Process",
    },
    {
      id: "L2026-B17",
      patient: "Ahmed Raza",
      test: "Thyroid",
      status: "Testing",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Laboratory Dashboard
          </h2>
          <p className="text-gray-500 mt-1">
            Monitor laboratory operations and sample processing.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Pending Tests",
              value: "18",
              color: "text-purple-600",
            },
            {
              label: "Completed",
              value: "51",
              color: "text-green-600",
            },
            {
              label: "Urgent Cases",
              value: "3",
              color: "text-red-600",
            },
            {
              label: "Average TAT",
              value: "38m",
              color: "text-purple-600",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-md p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {card.label}
              </p>

              <h3 className={`text-3xl font-bold mt-3 ${card.color}`}>
                {card.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Queue */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Live Sample Queue
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Track all incoming laboratory samples.
              </p>
            </div>

            <button className="px-5 py-2 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition">
              Export Report
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs uppercase text-gray-500">
                    Sample ID
                  </th>
                  <th className="px-6 py-4 text-xs uppercase text-gray-500">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-xs uppercase text-gray-500">
                    Test
                  </th>
                  <th className="px-6 py-4 text-xs uppercase text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs uppercase text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {queue.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-purple-50 transition"
                  >
                    <td className="px-6 py-5 font-semibold text-purple-700">
                      {item.id}
                    </td>

                    <td className="px-6 py-5 font-medium text-gray-800">
                      {item.patient}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {item.test}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Received"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "In-Process"
                            ? "bg-purple-100 text-purple-700"
                            : item.status === "Testing"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {item.status === "Received" ? (
                        <button
                          onClick={() =>
                            updateStatus(item.id, "In-Process")
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition"
                        >
                          <ScanBarcode size={16} />
                          Scan
                        </button>
                      ) : item.status === "Completed" ? (
                        <span className="text-green-600 font-semibold text-sm">
                          Completed
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            updateStatus(item.id, "Completed")
                          }
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition"
                        >
                          <CheckCircle size={16} />
                          Mark Done
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LabDashboard;