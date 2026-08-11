import React, { useEffect, useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

import { useAppointment } from "../../hooks/doctor/useDrBookAppointment";
import { useDoctor } from "../../context/doctor/DoctorContext";
import DoctorPatientContext from "../../context/patients/DoctorPatientContext";

const DrBookAppointment = ({ doctor, onClose }) => {
  const {
    bookAppointment,
    bookingLoading,
    bookingError,
    setBookingError,
    fetchAvailableSlots,
    slots,
    slotsLoading,
  } = useAppointment();
  const navigate = useNavigate();
  const { profile } = useDoctor();
  const doctorId = profile?.doctor?._id || null;
  // REAL DOCTOR PATIENTS

  const { patients: doctorPatients, fetchPatients } =
    useContext(DoctorPatientContext);

  // Fetch real patients when appointment modal opens

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  /* ---------------- PATIENT ---------------- */

  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  //  Convert DoctorPatientContext data into the format required by this component.

  const patients = useMemo(() => {
    return (doctorPatients || [])
      .filter((patient) => patient?.patientId?._id)
      .map((patient) => ({
        _id: patient.patientId._id,
        patientCode: patient.patientId.patientCode,
        name: patient.patientId.userId?.name || "Unknown",
        phone: patient.patientId.userId?.phone || "-",
        email: patient.patientId.userId?.email || "-",
        avatar: patient.patientId.userId?.avatar?.url || "",
      }));
  }, [doctorPatients]);

  // Search real patients by: name phone patient code
  const filteredPatients = useMemo(() => {
    const search = patientSearch.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return patients.filter((patient) => {
      return (
        patient.name?.toLowerCase().includes(search) ||
        patient.phone?.toLowerCase().includes(search) ||
        patient.patientCode?.toLowerCase().includes(search)
      );
    });
  }, [patients, patientSearch]);

  /* ---------------- WORKPLACES ---------------- */

  const workplaces = useMemo(
    () => profile?.doctor?.workplaces ?? [],
    [profile?.doctor?.workplaces],
  );

  const [selectedWorkplaceId, setSelectedWorkplaceId] = useState(null);

  // If user has selected a workplace, use it. Otherwise automatically use the first workplace.

  const selectedWorkplace = useMemo(() => {
    if (!workplaces.length) return null;

    if (selectedWorkplaceId) {
      return (
        workplaces.find((wp) => wp?._id === selectedWorkplaceId) ||
        workplaces[0]
      );
    }

    return workplaces[0];
  }, [workplaces, selectedWorkplaceId]);

  /* ---------------- APPOINTMENT STATE ---------------- */

  const [selectedConsultationType, setSelectedConsultationType] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");

  // Get consultation type from selected workplace.

  const workplaceConsultationType =
    selectedWorkplace?.settings?.consultationType || "";

  const effectiveConsultationType =
    selectedConsultationType || workplaceConsultationType;

  const canOnline =
    workplaceConsultationType === "online" ||
    workplaceConsultationType === "online_physical";

  const canPhysical =
    workplaceConsultationType === "physical" ||
    workplaceConsultationType === "online_physical";

  /* ---------------- DATE ---------------- */

  const [offset, setOffset] = useState(0);

  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const dates = useMemo(() => {
    const days = [];

    for (let i = 0; i < 5; i++) {
      const d = new Date();

      d.setDate(d.getDate() + offset + i);

      days.push({
        label: d.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        value: d.toISOString().split("T")[0],
      });
    }

    return days;
  }, [offset]);

  /* ---------------- FETCH SLOTS ---------------- */
  useEffect(() => {
    const workplaceId = selectedWorkplace?._id;

    if (!doctorId || !workplaceId || !date) {
      // console.log("Cannot fetch slots. Missing:", {  doctorId, workplaceId,  date, });

      return;
    }

    // console.log("Loading appointment slots:", { doctorId, workplaceId,  date,});

    fetchAvailableSlots(doctorId, workplaceId, date).catch((error) => {
      console.error(
        "Fetch available slots error:",
        error?.response?.data || error,
      );
    });
  }, [doctorId, selectedWorkplace?._id, date, fetchAvailableSlots]);

  /* ---------------- SLOT FORMAT ---------------- */

  const formatSlotLabel = (label) => {
    if (!label) return "";

    const lower = label.toLowerCase();

    if (lower.includes("am") || lower.includes("pm")) {
      return label;
    }

    let [hour, minute] = label.split(":").map(Number);

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return label;
    }

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  /* ---------------- CONVERT TIME ---------------- */

  const convertTo24Hour = (label) => {
    if (!label) return 0;

    const lower = label.toLowerCase();

    if (!lower.includes("am") && !lower.includes("pm")) {
      return Number(label.split(":")[0]);
    }

    const [timePart, modifier] = label.split(" ");

    let hours = Number(timePart.split(":")[0]);

    if (modifier?.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    }

    if (modifier?.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    return hours;
  };

  /* ---------------- GROUP SLOTS ---------------- */

  const groupedSlots = useMemo(() => {
    const grouped = {
      Night: [],
      Morning: [],
      Afternoon: [],
      Evening: [],
    };

    (slots || []).forEach((slot) => {
      const hour = convertTo24Hour(slot.label);

      if (hour >= 0 && hour < 5) {
        grouped.Night.push(slot);
      } else if (hour >= 5 && hour < 12) {
        grouped.Morning.push(slot);
      } else if (hour >= 12 && hour < 17) {
        grouped.Afternoon.push(slot);
      } else {
        grouped.Evening.push(slot);
      }
    });

    return grouped;
  }, [slots]);

  /* ---------------- SELECT WORKPLACE ---------------- */

  const handleWorkplaceChange = (workplace) => {
    setSelectedWorkplaceId(workplace?._id || null);

    setSelectedSlot("");
    setSelectedConsultationType("");
    setBookingError("");
  };

  /* ---------------- SELECT PATIENT ---------------- */

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setPatientSearch("");
    setSelectedSlot("");
    setBookingError("");
  };

  /* ---------------- BOOK APPOINTMENT ---------------- */
  const handleBook = async () => {
    if (!selectedPatient) {
      setBookingError("Please select a patient.");
      return;
    }

    if (!selectedWorkplace) {
      setBookingError("Please select a workplace.");
      return;
    }

    if (!selectedSlot) {
      setBookingError("Please select a time slot.");
      return;
    }

    if (!effectiveConsultationType) {
      setBookingError("Please select a consultation type.");
      return;
    }

    try {
      setBookingError("");

      // Doctor creates appointment directly.
      // Backend will atomically check whether
      // patient or doctor already occupied this slot.
      await bookAppointment({
        doctorId,
        patientId: selectedPatient._id,
        workplaceId: selectedWorkplace._id,
        date,
        time: selectedSlot,
        consultationType: effectiveConsultationType,
      });

      /*
       * Appointment successfully created.
       *
       * No need to reserve the slot separately.
       * Backend already created it as "pending".
       */

      onClose?.();

      // Go to Doctor Schedule
      navigate("/doctor/schedule");
    } catch (error) {
      console.error("Doctor booking error:", error?.response?.data || error);

      //  If another request booked the slot at the same time, backend returns 409.
      const message =
        error?.response?.data?.message || "Failed to book appointment.";

      setBookingError(message);

      // Refresh slots so the UI reflects the latest availability.

      try {
        await fetchAvailableSlots(doctorId, selectedWorkplace._id, date);
      } catch (refreshError) {
        console.error("Failed to refresh slots:", refreshError);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              New Appointment
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              Book an appointment for a patient
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* DOCTOR */}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Doctor
            </p>

            <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-3">
              {doctor?.user?.avatar?.url ? (
                <img
                  src={doctor.user.avatar.url}
                  alt="Doctor"
                  className="h-12 w-12 rounded-full border border-white object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <PersonOutlineRoundedIcon />
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900">
                  {doctor?.user?.name || "Doctor"}
                </h3>

                <p className="text-sm text-gray-500">
                  {doctor?.specialization || "-"}
                </p>
              </div>

              <span className="ml-auto rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                You
              </span>
            </div>
          </div>

          {/* PATIENT */}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Patient
            </p>

            {selectedPatient ? (
              <div className="flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-3">
                {selectedPatient.avatar ? (
                  <img
                    src={selectedPatient.avatar}
                    alt={selectedPatient.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <PersonOutlineRoundedIcon />
                  </div>
                )}

                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {selectedPatient.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {selectedPatient.phone}
                  </p>

                  {selectedPatient.patientCode && (
                    <p className="text-xs text-gray-400">
                      ID: {selectedPatient.patientCode}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedPatient(null);
                    setPatientSearch("");
                    setSelectedSlot("");
                    setBookingError("");
                  }}
                  className="text-xs font-medium text-purple-600 hover:text-purple-700"
                >
                  Change
                </button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <SearchRoundedIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fontSize="small"
                  />

                  <input
                    type="text"
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    placeholder="Search patient by name, phone or ID..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {patientSearch && (
                  <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <button
                          key={patient._id}
                          onClick={() => handlePatientSelect(patient)}
                          className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                        >
                          {patient.avatar ? (
                            <img
                              src={patient.avatar}
                              alt={patient.name}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                              <PersonOutlineRoundedIcon fontSize="small" />
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {patient.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {patient.phone}
                            </p>

                            {patient.patientCode && (
                              <p className="text-xs text-gray-400">
                                ID: {patient.patientCode}
                              </p>
                            )}
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-4 text-sm text-gray-500">
                        No patients found.
                      </p>
                    )}
                  </div>
                )}

                {!patientSearch && patients.length === 0 && (
                  <p className="mt-2 rounded-xl bg-gray-50 px-4 py-4 text-center text-sm text-gray-500">
                    No patients available.
                  </p>
                )}
              </>
            )}
          </div>

          {/* WORKPLACES */}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Workplace
            </p>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {workplaces.length > 0 ? (
                workplaces.map((wp) => (
                  <button
                    key={wp._id}
                    onClick={() => handleWorkplaceChange(wp)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                      selectedWorkplace?._id === wp._id
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {wp.name}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">No workplaces found.</p>
              )}
            </div>
          </div>

          {/* CONSULTATION TYPE */}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Consultation Type
            </p>

            <div className="flex w-fit rounded-xl bg-gray-100 p-1">
              {/* ONLINE */}

              <button
                disabled={!canOnline}
                onClick={() => {
                  if (!canOnline) return;

                  setSelectedConsultationType("online");
                  setSelectedSlot("");
                  setBookingError("");
                }}
                className={`rounded-lg px-5 py-2 text-sm transition ${
                  effectiveConsultationType === "online"
                    ? "bg-white font-medium text-purple-600 shadow-sm"
                    : canOnline
                      ? "text-gray-600 hover:bg-white/70"
                      : "cursor-not-allowed text-gray-300"
                }`}
              >
                💻 Online
              </button>

              {/* PHYSICAL */}

              <button
                disabled={!canPhysical}
                onClick={() => {
                  if (!canPhysical) return;

                  setSelectedConsultationType("physical");
                  setSelectedSlot("");
                  setBookingError("");
                }}
                className={`rounded-lg px-5 py-2 text-sm transition ${
                  effectiveConsultationType === "physical"
                    ? "bg-white font-medium text-purple-600 shadow-sm"
                    : canPhysical
                      ? "text-gray-600 hover:bg-white/70"
                      : "cursor-not-allowed text-gray-300"
                }`}
              >
                🏥 Physical
              </button>
            </div>
          </div>

          {/* DATE */}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Date
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOffset((prev) => Math.max(prev - 5, 0))}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </button>

              <div className="flex flex-1 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => {
                      setDate(d.value);
                      setSelectedSlot("");
                      setBookingError("");
                    }}
                    className={`flex-1 rounded-lg border px-2 py-2 text-sm transition ${
                      date === d.value
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setOffset((prev) => prev + 5)}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                <ArrowForwardIosIcon fontSize="small" />
              </button>
            </div>
          </div>

          {/* SLOTS */}

          <div>
            <div className="mb-3 flex items-center gap-2">
              <AccessTimeOutlinedIcon
                fontSize="small"
                className="text-gray-500"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Available Time Slots
              </p>
            </div>

            {slotsLoading ? (
              <p className="rounded-xl bg-gray-50 px-4 py-5 text-center text-sm text-gray-400">
                Loading available slots...
              </p>
            ) : !slots || slots.length === 0 ? (
              <p className="rounded-xl bg-gray-50 px-4 py-5 text-center text-sm text-gray-400">
                No availability for selected date
              </p>
            ) : (
              <div className="space-y-5">
                {Object.entries(groupedSlots).map(([session, items]) => {
                  if (!items.length) return null;

                  return (
                    <div key={session}>
                      <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                        {session}
                      </h3>

                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {items.map((slot) => (
                          <button
                            key={slot.label}
                            onClick={() => {
                              setSelectedSlot(slot.label);
                              setBookingError("");
                            }}
                            className={`rounded-lg border px-3 py-2.5 text-sm transition ${
                              selectedSlot === slot.label
                                ? "border-purple-600 bg-purple-600 font-medium text-white"
                                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-200 hover:bg-purple-50"
                            }`}
                          >
                            {formatSlotLabel(slot.label)}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ERROR */}

          {bookingError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{bookingError}</p>
            </div>
          )}

          {/* SUMMARY */}

          {selectedPatient && selectedSlot && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Appointment Summary
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Patient</p>

                  <p className="font-medium text-gray-900">
                    {selectedPatient.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Doctor</p>

                  <p className="font-medium text-gray-900">
                    {doctor?.user?.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Date</p>

                  <p className="font-medium text-gray-900">{date}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Time</p>

                  <p className="font-medium text-gray-900">
                    {formatSlotLabel(selectedSlot)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Workplace</p>

                  <p className="font-medium text-gray-900">
                    {selectedWorkplace?.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Consultation</p>

                  <p className="font-medium capitalize text-gray-900">
                    {effectiveConsultationType}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleBook}
            disabled={
              !selectedPatient ||
              !selectedSlot ||
              !selectedWorkplace ||
              !effectiveConsultationType ||
              bookingLoading
            }
            className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bookingLoading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrBookAppointment;
