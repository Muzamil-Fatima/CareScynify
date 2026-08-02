import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

import useLabSample from "../../hooks/laboratory/useLabSamples";
import LabSampleModal from "../../components/laboratory/LabSampleModal";

export default function LabSampleQueue() {
  const { samples, fetchLabSamples, changeSampleStatus, addLabSample } =
    useLabSample();

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  useEffect(() => {
    fetchLabSamples();
  }, [fetchLabSamples]);

  const filteredSamples = samples?.filter((item) =>
    (item.labPatientId?.name || item.patientId?.userId?.name|| "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

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
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Sample Queue</h2>

            <p className="text-sm text-gray-500">
              Manage all incoming lab samples
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 cursor-pointer rounded-xl font-semibold"
          >
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-xl">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-purple-50">
              <tr className="text-xs uppercase text-gray-500">
                <th className="p-4">Sample ID</th>

                <th className="p-4">Patient Name</th>

                <th className="p-4">Tests</th>

                <th className="p-4">Priority</th>

                <th className="p-4">Status</th>

                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSamples?.map((item) => (
                <tr key={item._id} className="hover:bg-purple-50 transition">
                  <td className="p-4 font-semibold text-purple-700">
                    {item.sampleId}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedPatient(item);
                        setShowPatientModal(true);
                      }}
                      className="font-medium text-purple-600 hover:underline cursor-pointer"
                    >
                      {item.labPatientId?.name ||
                        item.patientId?.userId?.name ||
                        "Unknown Patient"}
                    </button>
                  </td>

                  <td className="p-4 text-gray-600">
                    {item.tests?.map((test, index) => (
                      <span key={index}>
                        {test.testName}

                        {index !== item.tests.length - 1 && ", "}
                      </span>
                    ))}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : item.priority === "Urgent"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.sampleStatus)}`}
                    >
                      {item.sampleStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        title="Collected"
                        onClick={() =>
                          changeSampleStatus(item._id, "Collected")
                        }
                        className="p-2 rounded-lg hover:bg-purple-100 text-purple-600"
                      >
                        <Clock size={16} />
                      </button>

                      <button
                        title="Completed"
                        onClick={() =>
                          changeSampleStatus(item._id, "Completed")
                        }
                        className="p-2 rounded-lg hover:bg-green-100 text-green-600"
                      >
                        <CheckCircle2 size={16} />
                      </button>

                      <button
                        title="Rejected"
                        onClick={() => changeSampleStatus(item._id, "Rejected")}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                      >
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
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                Patient Information
              </h2>

              <button
                onClick={() => setShowPatientModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <b>Name:</b>{" "}
                {selectedPatient.labPatientId?.name ||
                  selectedPatient.patientId?.userId?.name ||
                  "N/A"}
              </p>

              <p>
                <b>Email:</b>{" "}
                {selectedPatient.patientId?.userId?.email || "N/A"}
              </p>

              <p>
                <b>Phone:</b>{" "}+
                {selectedPatient.patientId?.userId?.phone ||
                  selectedPatient.labPatientId?.mobile ||
                  "N/A"}
              </p>

              <p>
                <b>Gender:</b>{" "}
                {selectedPatient.labPatientId?.gender ||
                  selectedPatient.patientId?.gender ||
                  "N/A"}
              </p>

              <p>
                <b>Sample ID:</b> {selectedPatient.sampleId}
              </p>

              <p>
                <b>Tests:</b>{" "}
                {selectedPatient.tests?.map((test) => test.testName).join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* New Sample Modal */}
      {showModal && (
        <LabSampleModal
          closeModal={() => setShowModal(false)}
          addLabSample={addLabSample}
        />
      )}
    </div>
  );
}
