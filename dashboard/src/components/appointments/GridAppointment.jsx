import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const GridAppointment = () => {
  return (
    <div className="border border-slate-200 bg-white rounded-2xl p-5 shadow-xl shadow-purple-950/1">
      {/* Custom Styles Injection to match clean Tailwind slate specifications inside FullCalendar shadow-DOM hooks */}
      <style>{`
        .fc {
          --fc-border-color: #f1f5f9 !important;
          --fc-button-bg-color: #ffffff !important;
          --fc-button-border-color: #e2e8f0 !important;
          --fc-button-text-color: #475569 !important;
          --fc-button-active-bg-color: #f5f3ff !important;
          --fc-button-active-border-color: #c084fc !important;
          --fc-button-hover-bg-color: #f8fafc !important;
          --fc-today-bg-color: #faf5ff !important;
        }
        .fc .fc-button-primary:not(:disabled).fc-button-active {
          color: #7c3aed !important;
          font-weight: 700 !important;
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
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }
        .fc .fc-button {
          border-radius: 10px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          text-transform: capitalize !important;
        }
      `}</style>
      
      <div className="h-[calc(100vh-250px)] min-h-130">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="100%"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          selectable
          dateClick={(info) => {
            console.log("Selected target date block context:", info.dateStr);
          }}
          events={[]}
        />
      </div>
    </div>
  );
};

export default GridAppointment;