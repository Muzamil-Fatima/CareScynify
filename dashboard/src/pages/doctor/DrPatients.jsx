import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddPatient from "../../components/doctor/PatientProfile/AddPatients";

import useDoctorAppointments from "../../hooks/useDoctorAppointments";
import DoctorContext from "../../context/doctor/DoctorContext";
import DoctorPatientContext from "../../context/patients/DoctorPatientContext";
import useGlobalSearch from "../../hooks/doctor/useGlobalSearch";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const DrPatients = () => {
  const { activeWorkplaceId } = useContext(DoctorContext);
  const { appointments, loading } = useDoctorAppointments(activeWorkplaceId);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const navigate = useNavigate();
  const {
    searchValue,
    results: searchResults,
    loading: searchLoading,
  } = useGlobalSearch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const openPatientProfile = (patientId) => {
    navigate(`/doctor/patient/profile/${patientId}`);
  };
  const { patients: doctorPatients, fetchPatients } =
    useContext(DoctorPatientContext);
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const appointmentPatients = appointments
    .filter((item) => item?.patientId?._id)
    .map((item) => ({
      _id: item.patientId._id,
      patientCode: item.patientId.patientCode,
      name: item.patientId.userId?.name || "Unknown",
      phone: item.patientId.userId?.phone || "-",
      email: item.patientId.userId?.email || "-",
      avatar: item.patientId.userId?.avatar?.url || "",
    }));

  const manualPatients = doctorPatients
    .filter((patient) => patient?.patientId?._id)
    .map((patient) => ({
      _id: patient.patientId._id,
      patientCode: patient.patientId.patientCode,
      name: patient.patientId.userId?.name || "Unknown",
      phone: patient.patientId.userId?.phone || "-",
      email: patient.patientId.userId?.email || "-",
      avatar: patient.patientId.userId?.avatar?.url || "",
    }));

  const uniquePatients = Array.from(
    new Map(
      [ ...manualPatients, ...appointmentPatients].map((p) => [p._id, p]),
    ).values(),
  );

  const searchedPatients = Array.from(
    new Map(
      searchResults
        .filter(
          (result) =>
            result?.type === "patient" || result?.type === "appointment",
        )
        .map((result) => {
          const data = result?.data;
          const patient = data?.patientId;
          const user = patient?.userId;

          return {
            _id: patient?._id || result?.id,
            patientCode: patient?.patientCode || "-",
            name: user?.name || result?.title || "Unknown",
            phone: user?.phone || "-",
            email: user?.email || "-",
            avatar: user?.avatar?.url || "",
          };
        })
        .filter((patient) => patient?._id)
        .map((patient) => [patient._id, patient]),
    ).values(),
  );

  const displayedPatients = searchValue.trim()
    ? searchedPatients
    : uniquePatients;

  const totalPages = Math.ceil(displayedPatients.length / rowsPerPage);

  const paginatedPatients = displayedPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="font-secondary font-medium text-[13px] mr-4 ">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpenAddPatient(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
        >
          <AddRoundedIcon fontSize="small" />
          Add Patient
        </button>
      </div>
      <div className="border border-gray-300/30 rounded-[15px] bg-white shadow-sm">
        {/* Header */}
        <div className="flex py-3 px-4 items-center justify-between border-b border-gray-300/30">
          <div className="text-[16px] font-semibold text-gray-800">
            All Patients
          </div>

          <div className="flex items-center gap-3">
            {searchLoading && searchValue.trim() && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            )}

            <div className="text-gray-600">
              Total: {displayedPatients.length}
            </div>

            <button className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <EventAvailableIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto animate-spin"></div>
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
                        colSpan="4"
                        className="text-center py-10 text-gray-500"
                      >
                        {searchValue.trim()
                          ? `No patients found for "${searchValue}"`
                          : "No Patients found"}
                      </td>
                    </tr>
                  ) : (
                    paginatedPatients.map((user, index) => (
                      <tr
                        onDoubleClick={() => openPatientProfile(user?._id)}
                        key={user._id}
                        className={`border-b border-gray-100 ${
                          index % 2 !== 0 ? "bg-gray-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          {user?.patientCode || "-"}
                        </td>
                        {/* Patient */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 cursor-pointer">
                            {user?.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer">
                                {user?.name?.charAt(0) || "P"}
                              </div>
                            )}

                            <span>{user?.name || "Unknown"}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3 cursor-pointer">
                          {user?.email || "-"}
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-3 cursor-pointer">
                          + {user?.phone || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-4 flex justify-between items-center">
              <p className="text-gray-600">
                {displayedPatients.length === 0
                  ? "0"
                  : `${(currentPage - 1) * rowsPerPage + 1} -
       ${Math.min(
         currentPage * rowsPerPage,
         displayedPatients.length,
       )} of ${displayedPatients.length}`}
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
      <AddPatient
        open={openAddPatient}
        onClose={() => setOpenAddPatient(false)}
         onPatientAdded={fetchPatients}
      />
    </div>
  );
};

export default DrPatients;
