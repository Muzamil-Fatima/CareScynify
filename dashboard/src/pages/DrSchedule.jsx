// import React, { useState, useEffect } from "react";
// import useDoctorAppointments from "../../hooks/useDoctorAppointments";
// import {
//   FiPlus,
//   FiCalendar,
//   FiClock,
//   FiVideo,
//   FiMoreVertical,
//   FiCheckCircle,
//   FiUser,
//   FiXCircle,
// } from "react-icons/fi";

// const DrSchedule = () => {
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [openMenu, setOpenMenu] = useState(null);
//   const { appointments, loading, error, updateStatus, cancel } =
//     useDoctorAppointments();

//   useEffect(() => {
//     document.documentElement.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.documentElement.style.overflow = "auto";
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const formatTime = (time) => {
//     if (!time) return "-";

//     const date = new Date(`1970-01-01T${time}`);

//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const getStatusChip = (status) => {
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-xs font-semibold border ${
//           status === "confirmed"
//             ? "bg-green-100 text-green-700 border-green-300"
//             : status === "pending"
//               ? "bg-yellow-100 text-yellow-700 border-yellow-300"
//               : status === "completed"
//                 ? "bg-blue-100 text-blue-700 border-blue-300"
//                 : "bg-red-100 text-red-700 border-red-300"
//         }`}
//       >
//         {status}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//         <div className="p-6">Loading appointments...</div>
//     );
//   }

//   if (error) {
//     return (
//         <div className="p-6 text-red-500">{error}</div>
//     );
//   }
//   const filteredAppointments = appointments
//     .filter((appointment) => {
//       if (!appointment.appointmentDate) return false;

//       const appointmentDate = new Date(appointment.appointmentDate)
//         .toISOString()
//         .split("T")[0];

//       return appointmentDate === date;
//     })
//     .sort((a, b) => {
//       return a.appointmentTime.localeCompare(b.appointmentTime);
//     });
//   return (
//       <div className="w-full h-full px-1">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 mt-1">
//           <div>
//             <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
//               My Schedule
//             </h1>

//             <p className="text-sm text-slate-500 mt-1">
//               Manage timeline shifts, consultation time configurations, and
//               patient list slots.
//             </p>
//           </div>

//           <button className="bg-violet-700 hover:bg-violet-800 text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition">
//             <FiPlus />
//             Add Schedule Slot
//           </button>
//         </div>

//         {/* Filter Card */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8">
//           <div className="p-5 flex flex-wrap justify-between items-center gap-4">
//             <div className="flex items-center gap-2">
//               <FiCalendar className="text-violet-700 text-xl" />

//               <span className="font-semibold text-slate-700">
//                 Select Active Date Frame
//               </span>
//             </div>

//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-50 rounded-xl border border-slate-300 px-4 py-2
//                 text-slate-700
//                 font-medium
//                 outline-none
//                 focus:border-violet-700
//               "
//             />
//           </div>
//         </div>

//         {/* Section Title */}
//         <h2 className="uppercase text-sm font-bold text-slate-500 mb-2 pl-1 tracking-wide">
//           Appointments Queue System
//         </h2>

//         {/* Appointments Card */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible mb-3">
//           {filteredAppointments.length === 0 ? (
//             <div className="p-8 text-center text-slate-500">
//               No appointments found
//             </div>
//           ) : (
//             filteredAppointments.map((item, index) => (
//               <div
//                 key={item._id}
//                 className={`
//   flex flex-col xl:flex-row
//   xl:items-center
//   justify-between
//   gap-5
//   p-5 lg:p-6
//   transition
//   hover:bg-gray-50

//                   ${
//                     index !== filteredAppointments.length - 1
//                       ? "border-b border-slate-100"
//                       : ""
//                   }
//                 `}
//               >
//                 {/* Patient */}
//                 <div className="flex items-center gap-3 w-full xl:w-[30%] min-w-0">
//                   <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border bg-violet-100 text-violet-700">
//                     {item.patientId?.name
//                       ?.split(" ")
//                       .map((word) => word[0])
//                       .join("")
//                       .slice(0, 2)}
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-slate-900">
//                       {item.patientId?.name || "Unknown"}
//                     </h3>

//                     <p className="text-sm text-slate-500 truncate w-full">
//                       {item.patientId?.email || "-"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Appointment Info */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:w-[45%] mt-5 xl:mt-0 min-w-0">
//                   <div className="flex items-center gap-2 min-w-0">
//                     <FiClock className="text-slate-400" />

//                     <div className="min-w-0">
//                       <p className="font-semibold text-slate-900">
//                         {formatTime(item.appointmentTime)}
//                       </p>

//                       <p className="text-xs text-slate-400">Slot Interval</p>
//                     </div>
//                   </div>

//                   <div className="min-w-0">
//                     <p className="font-medium text-slate-700 capitalize">
//                       {item.appointmentType}
//                     </p>

//                     <p className="text-xs text-slate-400">Modality</p>
//                   </div>

//                   <div className="flex items-center xl:justify-start">
//                     {getStatusChip(item.status)}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div
//                   className="
//   flex items-center justify-end
//   gap-2
//   mt-4 xl:mt-0
//   relative
//   w-full xl:w-auto
//   shrink-0
// "
//                 >
//                   {item.appointmentType === "online" ? (
//                     <button
//                       className="
//   bg-violet-700 hover:bg-violet-800
//   text-white rounded-lg
//   px-4 py-2
//   text-sm font-semibold
//   flex items-center gap-2
//   whitespace-nowrap
//   shrink-0
//   transition
// "
//                     >
//                       <FiVideo />
//                       Join Room
//                     </button>
//                   ) : (
//                     <button className="border border-slate-300 hover:bg-slate-50 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 flex items-center gap-2 transition">
//                       <FiCheckCircle />
//                       Check In
//                     </button>
//                   )}

//                   <button
//                     onClick={() =>
//                       setOpenMenu(openMenu === item._id ? null : item._id)
//                     }
//                     className="text-slate-400 hover:text-slate-600 p-2"
//                   >
//                     <FiMoreVertical size={18} />
//                   </button>

//                   {openMenu === item._id && (
//                     <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
//                       <button
//                         onClick={() => {
//                           console.log("View Profile", item.patientId);
//                           setOpenMenu(null);
//                         }}
//                         className="w-full flex items-center gap-2 px-4 py-3 hover:bg-blue-50 text-left text-blue-700"
//                       >
//                         <FiUser />
//                         View Profile
//                       </button>

//                       <button
//                         onClick={async () => {
//                           await updateStatus(item._id, "confirmed");
//                           setOpenMenu(null);
//                         }}
//                         className="w-full flex items-center gap-2 px-4 py-3 hover:bg-indigo-50 text-left text-indigo-700"
//                       >
//                         <FiCheckCircle />
//                         Confirm Appointment
//                       </button>

//                       <button
//                         onClick={async () => {
//                           await updateStatus(item._id, "completed");
//                           setOpenMenu(null);
//                         }}
//                         className="w-full flex items-center gap-2 px-4 py-3 hover:bg-green-50 text-left text-green-700"
//                       >
//                         <FiCheckCircle />
//                         Mark Completed
//                       </button>

//                       <button
//                         onClick={async () => {
//                           await cancel(item._id);
//                           setOpenMenu(null);
//                         }}
//                         className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-left text-red-700"
//                       >
//                         <FiXCircle />
//                         Cancel Appointment
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//   );
// };

// export default DrSchedule;
import React, { useState, useEffect } from "react";
import useDoctorAppointments from "../hooks/useDoctorAppointments";
import ScheduleHeader from "../components/drSchedule/ScheduleHeader";
import DateFilterCard from "../components/drSchedule/DateFilterCard";
import AppointmentList from "../components/drSchedule/AppointmentList";

const DrSchedule = () => {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [openMenu, setOpenMenu] = useState(null);

  const { appointments, loading, error, updateStatus, cancel } =
    useDoctorAppointments();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  if (loading) {
    return <div className="p-6">Loading appointments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const filteredAppointments = appointments
    .filter((appointment) => {
      if (!appointment.appointmentDate) return false;

      const appointmentDate = new Date(appointment.appointmentDate)
        .toISOString()
        .split("T")[0];

      return appointmentDate === date;
    })
    .sort((a, b) =>
      a.appointmentTime.localeCompare(b.appointmentTime)
    );

  return (
    <div className="w-full h-full px-1">
      <ScheduleHeader />

      <DateFilterCard date={date} setDate={setDate} />

      <h2 className="uppercase text-sm font-bold text-slate-500 mb-2 pl-1 tracking-wide">
        Appointments Queue System
      </h2>

      <AppointmentList
        appointments={filteredAppointments}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        updateStatus={updateStatus}
        cancel={cancel}
      />
    </div>
  );
};

export default DrSchedule;
