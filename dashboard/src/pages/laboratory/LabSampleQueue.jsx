
import React, { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function LabSampleQueue() {
  const [queue] = useState([
    {
      id: "L-2026-001",
      name: "Ali Khan",
      test: "CBC",
      priority: "High",
      status: "Pending",
    },
    {
      id: "L-2026-002",
      name: "Fatima Z.",
      test: "Glucose",
      priority: "Normal",
      status: "Collected",
    },
    {
      id: "L-2026-003",
      name: "Ahmed Raza",
      test: "Thyroid",
      priority: "High",
      status: "Processing",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Collected":
        return "bg-purple-100 text-purple-700";
      case "Processing":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Sample Queue
            </h2>
            <p className="text-sm text-gray-500">
              Manage all incoming lab samples
            </p>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            + New Sample
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 font-medium hover:bg-purple-50 transition">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-purple-50 border-b border-gray-100">
              <tr className="text-xs uppercase text-gray-500 font-semibold">
                <th className="p-4">Sample ID</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Test Type</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {queue.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-purple-50 transition text-sm"
                >
                  <td className="p-4 font-semibold text-purple-700">
                    {item.id}
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    {item.name}
                  </td>

                  <td className="p-4 text-gray-600">{item.test}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-purple-100 text-purple-600 transition">
                        <Clock size={16} />
                      </button>

                      <button className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition">
                        <CheckCircle2 size={16} />
                      </button>

                      <button className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition">
                        <AlertTriangle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}