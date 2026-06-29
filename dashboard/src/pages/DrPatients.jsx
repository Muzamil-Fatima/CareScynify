import { useState, useContext } from "react";
import useDoctorAppointments from "../hooks/useDoctorAppointments";
import DoctorContext from "../context/doctor/DoctorContext";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const DrPatients = () => {
  const { activeWorkplaceId } = useContext(DoctorContext);

  const { appointments, loading } = useDoctorAppointments(activeWorkplaceId);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique patients only
  const uniquePatients = Array.from(
    new Map(
      appointments
        .filter((item) => item?.patientId?._id)
        .map((item) => [item.patientId._id, item.patientId]),
    ).values(),
  );

  // Pagination
  const totalPages = Math.ceil(uniquePatients.length / rowsPerPage);

  const paginatedPatients = uniquePatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="font-secondary font-medium text-[13px] mr-4">
      <div className="border border-gray-300/30 rounded-[15px] bg-white shadow-sm">
        {/* Header */}
        <div className="flex py-3 px-4 items-center justify-between border-b border-gray-300/30">
          <div className="text-[16px] font-semibold text-gray-800">
            All Patients
          </div>

          <div className="flex items-center gap-3">
            <div className="text-gray-600">Total: {uniquePatients.length}</div>

            <button className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <EventAvailableIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-3 text-gray-500">Loading Patients...</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto pb-12">
              <table className="w-full border-collapse text-gray-700">
                <thead>
                  <tr className="border-b border-gray-300/30 bg-gray-50">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedPatients.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-10 text-gray-500"
                      >
                        No Patients found
                      </td>
                    </tr>
                  ) : (
                    paginatedPatients.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`border-b border-gray-100 ${
                          index % 2 !== 0 ? "bg-gray-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                         #{(currentPage - 1) * rowsPerPage + index + 1}
                        </td>
                        {/* Patient */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {user?.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                                {user?.name?.charAt(0) || "P"}
                              </div>
                            )}

                            <span>{user?.name || "Unknown"}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3">{user?.email || "-"}</td>

                        {/* Phone */}
                        <td className="px-4 py-3">{user?.phone || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-4 flex justify-between items-center">
              <p className="text-gray-600">
                {uniquePatients.length === 0
                  ? "0"
                  : `${(currentPage - 1) * rowsPerPage + 1} -
                     ${Math.min(
                       currentPage * rowsPerPage,
                       uniquePatients.length,
                     )} of ${uniquePatients.length}`}
              </p>

              <div className="flex items-center gap-4">
                <div>
                  Rows:
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="ml-2 border rounded px-2 py-1"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
                  >
                    <KeyboardArrowLeftIcon />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
                  >
                    <KeyboardArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DrPatients;
