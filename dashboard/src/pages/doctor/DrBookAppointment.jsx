// import React, { useState } from "react";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

// const DrBookAppointment = ({ doctor, onClose }) => {
//   const [patientSearch, setPatientSearch] = useState("");
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const [appointmentType, setAppointmentType] = useState("online");
//   const [selectedWorkplace, setSelectedWorkplace] = useState(
//     doctor?.workplaces?.[0] || null,
//   );

//   const [offset, setOffset] = useState(0);
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

//   const [selectedSlot, setSelectedSlot] = useState("");

//   const patients = [
//     {
//       _id: "1",
//       name: "Ali Ahmed",
//       phone: "0300-1234567",
//       avatar: null,
//     },
//     {
//       _id: "2",
//       name: "Muhammad Usman",
//       phone: "0312-9876543",
//       avatar: null,
//     },
//     {
//       _id: "3",
//       name: "Ayesha Khan",
//       phone: "0321-5555555",
//       avatar: null,
//     },
//   ];

//   const filteredPatients = patients.filter(
//     (patient) =>
//       patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
//       patient.phone.includes(patientSearch),
//   );

//   const dates = [];

//   for (let i = 0; i < 5; i++) {
//     const d = new Date();

//     d.setDate(d.getDate() + offset + i);

//     dates.push({
//       label: d.toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//       }),
//       value: d.toISOString().split("T")[0],
//     });
//   }

//   const slots = [
//     "09:00",
//     "09:30",
//     "10:00",
//     "10:30",
//     "11:00",
//     "11:30",
//     "02:00",
//     "02:30",
//     "03:00",
//     "04:00",
//     "06:00",
//     "06:30",
//   ];

//   const formatSlotLabel = (label) => {
//     const [hour, minute] = label.split(":").map(Number);

//     const ampm = hour >= 12 ? "PM" : "AM";

//     let h = hour % 12;

//     if (h === 0) h = 12;

//     return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
//   };

//   const handleBook = () => {
//     if (!selectedPatient) {
//       return;
//     }

//     if (!selectedSlot) {
//       return;
//     }

//     console.log({
//       patientId: selectedPatient._id,
//       doctorId: doctor?._id,
//       workplaceId: selectedWorkplace?._id,
//       date,
//       time: selectedSlot,
//       appointmentType,
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
//       <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl bg-white shadow-2xl">
//         {/* HEADER */}
//         <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               New Appointment
//             </h2>

//             <p className="mt-0.5 text-sm text-gray-500">
//               Book an appointment for a patient
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
//           >
//             <CloseRoundedIcon />
//           </button>
//         </div>

//         <div className="space-y-6 p-6">
//           {/* DOCTOR */}
//           <div>
//             <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
//               Doctor
//             </p>

//             <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-3">
//               <img
//                 src={doctor?.user?.avatar?.url}
//                 alt="Doctor"
//                 className="h-12 w-12 rounded-full border border-white object-cover"
//               />

//               <div>
//                 <h3 className="font-semibold text-gray-900">
//                   {doctor?.user?.name}
//                 </h3>

//                 <p className="text-sm text-gray-500">
//                   {doctor?.specialization}
//                 </p>
//               </div>

//               <span className="ml-auto rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
//                 You
//               </span>
//             </div>
//           </div>

//           {/* PATIENT */}
//           <div>
//             <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
//               Patient
//             </p>

//             {selectedPatient ? (
//               <div className="flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
//                   <PersonOutlineRoundedIcon />
//                 </div>

//                 <div className="flex-1">
//                   <p className="font-medium text-gray-900">
//                     {selectedPatient.name}
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     {selectedPatient.phone}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => setSelectedPatient(null)}
//                   className="text-xs font-medium text-purple-600 hover:text-purple-700"
//                 >
//                   Change
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="relative">
//                   <SearchRoundedIcon
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     fontSize="small"
//                   />

//                   <input
//                     type="text"
//                     value={patientSearch}
//                     onChange={(e) => setPatientSearch(e.target.value)}
//                     placeholder="Search patient by name or phone..."
//                     className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
//                   />
//                 </div>

//                 {patientSearch && (
//                   <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//                     {filteredPatients.length > 0 ? (
//                       filteredPatients.map((patient) => (
//                         <button
//                           key={patient._id}
//                           onClick={() => {
//                             setSelectedPatient(patient);
//                             setPatientSearch("");
//                           }}
//                           className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
//                         >
//                           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500">
//                             <PersonOutlineRoundedIcon fontSize="small" />
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">
//                               {patient.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {patient.phone}
//                             </p>
//                           </div>
//                         </button>
//                       ))
//                     ) : (
//                       <p className="px-4 py-4 text-sm text-gray-500">
//                         No patients found.
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//           {/* APPOINTMENT TYPE */}
//           <div>
//             <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
//               Appointment Type
//             </p>
//             <div className="flex w-fit rounded-xl bg-gray-100 p-1">
//               <button
//                 onClick={() => {
//                   setAppointmentType("online");
//                   setSelectedSlot("");
//                 }}
//                 className={`rounded-lg px-5 py-2 text-sm transition ${
//                   appointmentType === "online"
//                     ? "bg-white font-medium text-purple-600 shadow-sm"
//                     : "text-gray-600"
//                 }`}
//               >
//                 💻 Online
//               </button>
//               <button
//                 onClick={() => {
//                   setAppointmentType("physical");
//                   setSelectedSlot("");
//                 }}
//                 className={`rounded-lg px-5 py-2 text-sm transition ${
//                   appointmentType === "physical"
//                     ? "bg-white font-medium text-purple-600 shadow-sm"
//                     : "text-gray-600"
//                 }`}
//               >
//                 🏥 Physical
//               </button>
//             </div>
//           </div>
//           {/* WORKPLACES */}
//           <div>
//             <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
//               Workplace
//             </p>
//             <div className="flex gap-2 overflow-x-auto pb-1">
//               {doctor?.workplaces?.map((wp) => (
//                 <button
//                   key={wp._id}
//                   onClick={() => {
//                     setSelectedWorkplace(wp);
//                     setSelectedSlot("");
//                   }}
//                   className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
//                     selectedWorkplace?._id === wp._id
//                       ? "border-purple-600 bg-purple-600 text-white"
//                       : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {wp.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* DATE */}
//           <div>
//             <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
//               Date
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setOffset((prev) => Math.max(prev - 5, 0))}
//                 className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
//               >
//                 <ArrowBackIosNewIcon fontSize="small" />
//               </button>

//               <div className="flex flex-1 gap-2">
//                 {dates.map((d) => (
//                   <button
//                     key={d.value}
//                     onClick={() => {
//                       setDate(d.value);
//                       setSelectedSlot("");
//                     }}
//                     className={`flex-1 rounded-lg border px-2 py-2 text-sm transition ${
//                       date === d.value
//                         ? "border-purple-600 bg-purple-600 text-white"
//                         : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     {d.label}
//                   </button>
//                 ))}
//               </div>
//               <button
//                 onClick={() => setOffset((prev) => prev + 5)}
//                 className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
//               >
//                 <ArrowForwardIosIcon fontSize="small" />
//               </button>
//             </div>
//           </div>
//           {/* SLOTS */}
//           <div>
//             <div className="mb-3 flex items-center gap-2">
//               <AccessTimeOutlinedIcon
//                 fontSize="small"
//                 className="text-gray-500"
//               />
//               <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Available Time Slots
//               </p>
//             </div>
//             {slots.length === 0 ? (
//               <p className="rounded-xl bg-gray-50 px-4 py-5 text-center text-sm text-gray-400">
//                 No availability for selected date
//               </p>
//             ) : (
//               <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
//                 {slots.map((slot) => (
//                   <button
//                     key={slot}
//                     onClick={() => setSelectedSlot(slot)}
//                     className={`rounded-lg border px-3 py-2.5 text-sm transition ${
//                       selectedSlot === slot
//                         ? "border-purple-600 bg-purple-600 font-medium text-white"
//                         : "border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-200 hover:bg-purple-50"
//                     }`}
//                   >
//                     {formatSlotLabel(slot)}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* SELECTED SUMMARY */}
//           {selectedPatient && selectedSlot && (
//             <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
//               <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Appointment Summary
//               </p>

//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-xs text-gray-400">Patient</p>
//                   <p className="font-medium text-gray-900">
//                     {selectedPatient.name}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-400">Doctor</p>
//                   <p className="font-medium text-gray-900">
//                     {doctor?.user?.name}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-400">Date</p>
//                   <p className="font-medium text-gray-900">{date}</p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-400">Time</p>
//                   <p className="font-medium text-gray-900">
//                     {formatSlotLabel(selectedSlot)}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-400">Workplace</p>
//                   <p className="font-medium text-gray-900">
//                     {selectedWorkplace?.name}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-400">Type</p>
//                   <p className="font-medium capitalize text-gray-900">
//                     {appointmentType}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* FOOTER */}
//         <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
//           <button
//             onClick={onClose}
//             className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleBook}
//             disabled={!selectedPatient || !selectedSlot}
//             className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Book Appointment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrBookAppointment;
import React, { useEffect, useMemo, useState, useCallback } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

import { getAvailableSlots } from "../../api/doctor/drBookappointment";
import { useAppointment } from "../../hooks/doctor/useDrBookAppointment";

const DrBookAppointment = ({ doctor, onClose }) => {
  const { bookAppointment, bookingLoading } = useAppointment();

  /* ---------------- PATIENT ---------------- */

  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  /*
   * Replace this with your real patients API/context.
   * These are only temporary examples.
   */
  const patients = [
    {
      _id: "1",
      name: "Ali Ahmed",
      phone: "0300-1234567",
      avatar: null,
    },
    {
      _id: "2",
      name: "Muhammad Usman",
      phone: "0312-9876543",
      avatar: null,
    },
    {
      _id: "3",
      name: "Ayesha Khan",
      phone: "0321-5555555",
      avatar: null,
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      patient.phone.includes(patientSearch),
  );

  /* ---------------- WORKPLACE ---------------- */

  const [selectedWorkplace, setSelectedWorkplace] = useState(
    doctor?.workplaces?.[0] || null,
  );

  /*
   * IMPORTANT:
   * consultationType comes from the selected workplace.
   */
  const consultationType = selectedWorkplace?.settings?.consultationType || "";

  const canOnline =
    consultationType === "online" || consultationType === "online_physical";

  const canPhysical =
    consultationType === "physical" || consultationType === "online_physical";

  const [selectedConsultationType, setSelectedConsultationType] =
    useState("online");

  /* ---------------- WORKPLACE CHANGE ---------------- */

  useEffect(() => {
    if (!selectedWorkplace) return;

    const type = selectedWorkplace?.settings?.consultationType;

    if (type === "online") {
      setSelectedConsultationType("online");
    } else if (type === "physical") {
      setSelectedConsultationType("physical");
    } else if (type === "online_physical") {
      setSelectedConsultationType((prev) =>
        prev === "online" || prev === "physical" ? prev : "online",
      );
    } else {
      setSelectedConsultationType("");
    }

    setSelectedSlot("");
  }, [selectedWorkplace]);

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

  /* ---------------- SLOTS ---------------- */

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const fetchSlots = useCallback(async () => {
    if (!doctor?._id || !selectedWorkplace?._id || !date) {
      setSlots([]);
      return;
    }

    try {
      setLoadingSlots(true);

      const data = await getAvailableSlots(
        doctor._id,
        selectedWorkplace._id,
        date,
      );

      setSlots(data || []);
    } catch (error) {
      console.error("Fetch available slots error:", error);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [doctor?._id, selectedWorkplace?._id, date]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  /* ---------------- SLOT FORMAT ---------------- */

  const formatSlotLabel = (label) => {
    if (!label) return "";

    const lower = label.toLowerCase();

    if (lower.includes("am") || lower.includes("pm")) {
      return label;
    }

    let [hour, minute] = label.split(":").map(Number);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

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

    slots.forEach((slot) => {
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

    if (!selectedConsultationType) {
      setBookingError("Please select a consultation type.");
      return;
    }

    try {
      setBookingError("");

      await bookAppointment({
        patientId: selectedPatient._id,
        doctorId: doctor._id,
        workplaceId: selectedWorkplace._id,
        date,
        time: selectedSlot,
        consultationType: selectedConsultationType,
      });

      /*
       * Refresh slots after successful booking.
       * This is important because maxPatientsPerDay
       * may have changed.
       */
      await fetchSlots();

      setSelectedSlot("");

      onClose?.();
    } catch (error) {
      console.error("Doctor booking error:", error);

      setBookingError(
        error?.response?.data?.message || "Failed to book appointment.",
      );

      /*
       * Refresh in case another booking consumed
       * the slot/capacity.
       */
      await fetchSlots();
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
              <img
                src={doctor?.user?.avatar?.url}
                alt="Doctor"
                className="h-12 w-12 rounded-full border border-white object-cover"
              />

              <div>
                <h3 className="font-semibold text-gray-900">
                  {doctor?.user?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {doctor?.specialization}
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <PersonOutlineRoundedIcon />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {selectedPatient.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {selectedPatient.phone}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedPatient(null);
                    setPatientSearch("");
                    setSelectedSlot("");
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
                    placeholder="Search patient by name or phone..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {patientSearch && (
                  <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <button
                          key={patient._id}
                          onClick={() => {
                            setSelectedPatient(patient);
                            setPatientSearch("");
                            setSelectedSlot("");
                          }}
                          className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                            <PersonOutlineRoundedIcon fontSize="small" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {patient.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {patient.phone}
                            </p>
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
              </>
            )}
          </div>

          {/* WORKPLACES */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Workplace
            </p>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {doctor?.workplaces?.map((wp) => (
                <button
                  key={wp._id}
                  onClick={() => {
                    setSelectedWorkplace(wp);
                    setSelectedSlot("");
                    setBookingError("");
                  }}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                    selectedWorkplace?._id === wp._id
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {wp.name}
                </button>
              ))}
            </div>
          </div>

          {/* CONSULTATION TYPE */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Consultation Type
            </p>

            <div className="flex w-fit rounded-xl bg-gray-100 p-1">
              <button
                disabled={!canOnline}
                onClick={() => {
                  if (!canOnline) return;

                  setSelectedConsultationType("online");
                  setSelectedSlot("");
                  setBookingError("");
                }}
                className={`rounded-lg px-5 py-2 text-sm transition ${
                  selectedConsultationType === "online"
                    ? "bg-white font-medium text-purple-600 shadow-sm"
                    : canOnline
                      ? "text-gray-600 hover:bg-white/70"
                      : "cursor-not-allowed text-gray-300"
                }`}
              >
                💻 Online
              </button>

              <button
                disabled={!canPhysical}
                onClick={() => {
                  if (!canPhysical) return;

                  setSelectedConsultationType("physical");
                  setSelectedSlot("");
                  setBookingError("");
                }}
                className={`rounded-lg px-5 py-2 text-sm transition ${
                  selectedConsultationType === "physical"
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

            {loadingSlots ? (
              <p className="rounded-xl bg-gray-50 px-4 py-5 text-center text-sm text-gray-400">
                Loading available slots...
              </p>
            ) : slots.length === 0 ? (
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
                    {selectedConsultationType}
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
              !selectedConsultationType ||
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
