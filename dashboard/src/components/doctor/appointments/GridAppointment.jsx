import React, { useState, useContext } from "react";
import useDoctorAppointments from "../../../hooks/useDoctorAppointments";
import DoctorContext from "../../../context/doctor/DoctorContext";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const GridAppointment = () => {
  const { activeWorkplaceId } = useContext(DoctorContext);
  const { appointments } = useDoctorAppointments(activeWorkplaceId);
  // State object to track which appointment is currently visible for each date
  const [currentIndices, setCurrentIndices] = useState({});

  // States to manage the modal
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prepares the appointment information to be compatible with the FullCalendar format
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment._id,
    title: appointment.patientId?.userId?.name || "Patient",
    start: `${new Date(appointment.appointmentDate).toISOString().split("T")[0]}T${appointment.appointmentTime}`,
    end: `${new Date(appointment.appointmentDate).toISOString().split("T")[0]}T${appointment.endTime}`,
    extendedProps: {
      patientId: appointment.patientId?._id,
      status: appointment.status,
      workplace: appointment.workplaceName,
      location: appointment.workplaceLocation,

      patientAvatar: appointment.patientId?.userId?.avatar,
      patientPhone: appointment.patientId?.userId?.phone || "N/A",
      patientEmail: appointment.patientId?.userId?.email || "N/A",

      paymentStatus: appointment.paymentStatus || "Pending",
    },
  }));

  // Returns all appointments for a specific date
  const getAppointmentsByDate = (dateStr) => {
    return calendarEvents.filter((app) => app.start.startsWith(dateStr));
  };

  // Cycles through appointments when multiple appointments exist on the same day
  const handleNextAppointment = (dateStr, totalCount, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndices((prev) => ({
      ...prev,
      [dateStr]: ((prev[dateStr] || 0) + 1) % totalCount,
    }));
  };

  // Helper to safely format time from a date object to "HH:MM am/pm"
  const formatTimeHelper = (dateObj) => {
    if (!dateObj || isNaN(dateObj.getTime())) return "";
    return dateObj
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  // Function called whenever an event slot is clicked in any view
  const handleEventClick = (clickInfo) => {
    const { event } = clickInfo;
    const props = event.extendedProps;

    const details = {
      id: event.id,
      title: event.title,
      avatar: props.patientAvatar,
       patientId: props.patientId, 
      dateFormatted: new Date(event.start).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      startTimeFormatted: formatTimeHelper(event.start),
      endTimeFormatted: formatTimeHelper(event.end),
      status: props.status,
      workplace: props.workplace,
      location: props.location,
      phone: props.patientPhone,
      email: props.patientEmail,
      payment: props.paymentStatus,
    };

    setSelectedAppointment(details);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Helper functions inside component for styling tags safely
  const getStatusClasses = (stat) => {
    switch (stat?.toLowerCase()) {
      case "confirmed":
      case "paid":
        return "bg-emerald-50 text-emerald-800 ring-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-900 ring-amber-100";
      case "cancelled":
        return "bg-rose-50 text-rose-800 ring-rose-100";
      default:
        return "bg-slate-50 text-slate-800 ring-slate-100";
    }
  };

  // Custom renderer for FullCalendar events
  const renderEventContent = (eventInfo) => {
    // --- WEEK AND DAY VIEW STYLING ---
    if (eventInfo.view.type !== "dayGridMonth") {
      return (
        <div className="w-full h-full p-2 bg-purple-50 hover:bg-purple-100 border-l-4 border-purple-600 rounded-r-lg flex flex-col justify-center overflow-hidden shadow-sm transition-all duration-200 pointer-events-none">
          <div className="text-[11px] font-bold text-purple-900 truncate leading-tight">
            {eventInfo.event.title}
          </div>
          <div className="text-[10px] font-semibold text-purple-600 mt-1 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-2.5 h-2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {eventInfo.timeText.toLowerCase()}
          </div>
        </div>
      );
    }

    // --- MONTH VIEW LOGIC ---
    const dateStr = eventInfo.event.startStr.split("T")[0];
    const dayAppointments = getAppointmentsByDate(dateStr);
    const activeIndex = currentIndices[dateStr] || 0;

    if (eventInfo.event.id !== dayAppointments[0]?.id) {
      return { html: "" };
    }

    const currentActiveApp = dayAppointments[activeIndex] || dayAppointments[0];
    const dayNumber = new Date(currentActiveApp.start).getDate();

    const appointmentTime = formatTimeHelper(new Date(currentActiveApp.start));
    const avatar = currentActiveApp.extendedProps.patientAvatar;
    return (
      <div className="w-full flex flex-col items-center justify-center text-center pt-6 pb-2 px-2 bg-white rounded-xl pointer-events-auto relative border border-slate-100 shadow-sm">
        <div className="absolute top-1.5 right-2 text-xs font-bold text-slate-400">
          {dayNumber}
        </div>

        <div className="h-10 w-10 rounded-full overflow-hidden ring-4 ring-purple-50 bg-purple-100 flex items-center justify-center mb-1">
          {avatar ? (
            <img
              src={avatar}
              alt={currentActiveApp.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-purple-700 font-bold text-sm">
              {currentActiveApp.title.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="text-[11px] font-semibold text-purple-600 leading-tight">
          {appointmentTime}
        </div>

        <div className="text-xs font-bold text-slate-800 truncate max-w-27.5 mx-auto mt-0.5">
          {currentActiveApp.title}
        </div>

        {dayAppointments.length > 1 && (
          <div className="w-full pt-1.5 mt-1.5 border-t border-slate-100 flex items-center justify-between px-0.5">
            <span className="text-[9px] font-extrabold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">
              {activeIndex + 1}/{dayAppointments.length}
            </span>
            <button
              type="button"
              onClick={(e) =>
                handleNextAppointment(dateStr, dayAppointments.length, e)
              }
              className="text-slate-400 hover:text-purple-700 p-0.5 rounded-md hover:bg-purple-50 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border border-slate-200 bg-white rounded-2xl p-5 shadow-xl mx-auto max-w-6xl relative">
      <style>{`
        .fc {
          --fc-border-color: #f1f5f9 !important;
          --fc-button-bg-color: #ffffff !important;
          --fc-button-border-color: #e2e8f0 !important;
          --fc-button-text-color: #475569 !important;
          --fc-button-active-bg-color: #f5f3ff !important;
          --fc-button-active-border-color: #c084fc !important;
          --fc-button-hover-bg-color: #f8fafc !important;
          --fc-today-bg-color: transparent !important;
          --fc-event-border-color: transparent !important;
          --fc-event-bg-color: transparent !important;
        }
        .fc-toolbar-title {
          font-size: 1.15rem !important;
          font-weight: 700 !important;
          color: #0f172a !important;
        }
        .fc-col-header-cell-cushion {
          color: #475569 !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          text-transform: uppercase;
          text-decoration: none !important;
        }
        .fc .fc-button {
          border-radius: 10px !important;
          font-size: 13px !important;
          font-weight: 600;
          text-transform: capitalize;
        }
        .fc-dayGridMonth-view .fc-v-event, 
        .fc-dayGridMonth-view .fc-h-event {
          background-color: transparent !important;
          border: none !important;
          display: block !important;
        }
        .fc-dayGridMonth-view .fc-daygrid-day-top {
          position: absolute !important;
          top: 6px !important;
          right: 8px !important;
          z-index: 10 !important;
          flex-direction: row-reverse !important;
        }
        .fc-dayGridMonth-view .fc-daygrid-day-number {
          font-weight: 700 !important;
          color: #94a3b8 !important;
          font-size: 13px !important;
          padding: 0 !important;
        }
        .fc-dayGridMonth-view .fc-daygrid-day:has(.fc-daygrid-event-harness) .fc-daygrid-day-top {
          display: none !important;
        }
        .fc-timeGridWeek-view .fc-v-event,
        .fc-timeGridDay-view .fc-v-event {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0px 2px !important;
          cursor: pointer !important;
        }
        .fc-timegrid-slot-label-cushion {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #64748b !important;
          text-transform: lowercase;
        }
        .fc-day-today {
          outline: 2.5px solid #7c3aed !important;
          outline-offset: -2.5px;
          background-color: #f5f3ff !important;
          position: relative;
          z-index: 5 !important;
        }
        .fc-daygrid-day-events {
          margin-top: 0px !important;
          padding: 4px !important;
        }
        .fc-daygrid-day-frame {
          min-height: 120px !important;
          position: relative !important;
        }
        .fc-daygrid-event-harness {
          margin: 0 !important;
          padding: 2px !important;
        }
        .fc-day-other {
          background-color: #fafbfc !important;
        }
        .fc-day-other .fc-daygrid-day-number {
          color: #cbd5e1 !important;
          font-weight: 500 !important;
        }
      `}</style>

      <div className="h-auto min-h-125">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          /* Removed fixed initialDate to allow automatic focus on the current date week/day */
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          selectable
          fixedWeekCount={false}
          events={calendarEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventMinHeight={45}
          nowIndicator={
            true
          } /* Added to ensure views automatically center around the current time/date */
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            meridiem: "short",
          }}
        />
      </div>
      <AppointmentDetailsModal
        isOpen={isModalOpen}
        appointment={selectedAppointment}
        onClose={closeModal}
        getStatusClasses={getStatusClasses}
      />
    </div>
  );
};

export default GridAppointment;
