import { useState } from "react";
import {useNavigate} from "react-router-dom";
import useDoctorAppointments from "../../hooks/useDoctorAppointments";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
const PendingAppointment = () => {
  const { appointments, loading, updateStatus } = useDoctorAppointments();
  const navigate = useNavigate();
  const [timeFormat, setTimeFormat] = useState("12h");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openStatus, setOpenStatus] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openStatusMenu, setOpenStatusMenu] = useState(null);

  // Status Counts
  const cancelledCount = appointments.filter(
    (item) => item.status === "cancelled",
  ).length;
  const pendingCount = appointments.filter(
    (item) => item.status === "pending",
  ).length;
  const formatTime = (time) => {
    if (!time) return "-";

    const date = new Date(`1970-01-01T${time}`);

    return timeFormat === "12h"
      ? date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };
  const openPatientProfile = (patientId) => {
    navigate(`/doctor/patient/profile/${patientId}`);
  };
  // Filter
  const filteredAppointments = appointments.filter(
    (item) => item.status === "pending" || item.status === "cancelled",
  );
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="font-secondary font-medium text-[13px] mr-4">
      {/* TABLE CARD */}
      <div className="border border-gray-300/30 rounded-[15px] bg-white shadow-sm">
        {/* HEADER */}
        <div className="flex py-3 px-4 items-center justify-between border-b border-gray-300/30">
          <div className="text-[16px] font-semibold text-gray-800">
            Pending Appointments
          </div>

          <div className="flex items-center gap-3">
            <div className="text-gray-600">Total: {appointments.length}</div>

            <button className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <EventAvailableIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-3 text-gray-500">Loading appointments...</p>
          </div>
        ) : (
          <>
            {/* TABLE */}
            <div className="overflow-x-auto pb-12">
              <table className="w-full border-collapse text-gray-700">
                <thead>
                  <tr className="border-b border-gray-300/30 bg-gray-50">
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left relative">
                      {/* Trigger */}
                      <div
                        className="inline-flex items-center gap-1 cursor-pointer select-none text-gray-700 font-medium"
                        onClick={() => setOpenTime((prev) => !prev)}
                      >
                        Timing
                        <span className="text-xs text-gray-500">▾</span>
                      </div>

                      {/* Dropdown */}
                      {openTime && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => {
                              setTimeFormat("12h");
                              setOpenTime(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            12 Hour
                          </button>

                          <button
                            onClick={() => {
                              setTimeFormat("24h");
                              setOpenTime(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            24 Hour
                          </button>
                        </div>
                      )}
                    </th>
                    <th className="px-4 py-3 text-left relative">
                      {/* Trigger */}
                      <div
                        className="inline-flex items-center gap-1 cursor-pointer select-none text-gray-700 font-medium"
                        onClick={() => setOpenStatus(!openStatus)}
                        onMouseEnter={() => setOpenStatus(true)}
                      >
                        Status
                        <span className="text-xs text-gray-500">▾</span>
                      </div>

                      {/* Dropdown */}
                      {openStatus && (
                        <div
                          className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                          onMouseLeave={() => setOpenStatus(false)}
                        >
                          <button
                            onClick={() => {
                              setCurrentPage(1);
                              setOpenStatus(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            All ({appointments.length})
                          </button>
                          <button
                            onClick={() => {
                              setCurrentPage(1);
                              setOpenStatus(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            Pending ({pendingCount})
                          </button>

                          <button
                            onClick={() => {
                              setCurrentPage(1);
                              setOpenStatus(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Cancelled ({cancelledCount})
                          </button>
                        </div>
                      )}
                    </th>
                    <th className="px-4 py-3 text-center">Verified</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedAppointments.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-10 text-gray-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    paginatedAppointments.map((item, index) => {
                      const user = item.patientId;
                      return (
                        <tr
                          onDoubleClick={() => openPatientProfile(user?._id)}
                          key={item._id}
                          className={`border-b border-gray-100 ${
                            index % 2 !== 0 ? "bg-gray-50" : ""
                          }`}
                        >
                          {/* Patient */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {user?.avatar ? (
                                <img
                                  src={user.avatar}
                                  className="w-9 h-9 rounded-full"
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
                          {/* Date */}
                          <td className="px-4 py-3">
                            {item.appointmentDate
                              ? new Date(
                                  item.appointmentDate,
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "-"}
                          </td>

                          {/* Time */}
                          <td className="px-4 py-3">
                            {formatTime(item.appointmentTime)}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3 relative">
                            {/* STATUS BADGE (CLICKABLE) */}
                            <button
                              onClick={() =>
                                setOpenStatusMenu(
                                  openStatusMenu === item._id ? null : item._id,
                                )
                              }
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                item.status === "confirmed"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : item.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700 border-yellow-300 cursor-pointer"
                                    : "bg-red-100 text-red-700 border-red-300"
                              }`}
                            >
                              {item.status}
                            </button>

                            {/* DROPDOWN */}
                            {openStatusMenu === item._id && (
                              <div className="absolute mt-2 left-0 w-40 bg-white border rounded-lg shadow-lg z-50">
                                {/* CONFIRM */}
                                <button
                                  onClick={async () => {
                                    await updateStatus(item._id, "confirmed");
                                    setOpenStatusMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-green-50 text-green-700"
                                >
                                  <CheckCircleOutlineIcon fontSize="small" />
                                  Confirm
                                </button>

                                {/* CANCEL */}
                                <button
                                  onClick={async () => {
                                    await updateStatus(item._id, "cancelled");
                                    setOpenStatusMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-700"
                                >
                                  <CancelOutlinedIcon fontSize="small" />
                                  Cancel
                                </button>
                              </div>
                            )}
                          </td>

                          {/* Verify */}
                          <td className="px-4 py-3 text-center relative"></td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="px-4 py-4 flex justify-between items-center">
              <p className="text-gray-600">
                {(currentPage - 1) * rowsPerPage + 1} -
                {Math.min(currentPage * rowsPerPage, appointments.length)} of{" "}
                {appointments.length}
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
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    <KeyboardArrowLeftIcon />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
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

export default PendingAppointment;
