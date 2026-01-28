import FullCalendar from "@fullcalendar/react"; // must be default import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


const GridAppointment = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-3">

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="85vh"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          selectable
          dateClick={(info) => {
            console.log("Selected date:", info.dateStr);
            // open booking modal here
          }}
          events={[]}
        />

      </div>
    </div>
  );
};

export default GridAppointment;
