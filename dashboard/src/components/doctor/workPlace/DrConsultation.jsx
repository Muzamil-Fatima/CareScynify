import { useDoctor } from "../../../context/doctor/DoctorContext";
import { X } from "lucide-react";

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DrConsultation = ({ workplace }) => {
  const { profile, conflicts, consultationHours } = useDoctor();
  const { setDayTime, removeDay } = consultationHours ?? {};
  const workplaceId = workplace?._id;

  const currentWorkplace = profile?.doctor?.workplaces?.find(
    (w) => w?._id === workplaceId,
  );

  const availability = currentWorkplace?.availability ?? {};

  const calculateDuration = (start, end) => {
    if (!start || !end) return null;
    if (!start.includes(":") || !end.includes(":")) return null;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    if ([sh, sm, eh, em].some(isNaN)) return null;

    const diff = eh * 60 + em - (sh * 60 + sm);
    if (diff <= 0) return null;

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div className="flex justify-between items-center">
        <label className="text-lg font-semibold text-gray-800">
          Consultation Hours (Per Day)
        </label>
      </div>

      {conflicts && Object.values(conflicts).some(Boolean) && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">
          ⚠ Conflict detected
        </div>
      )}

      {daysList.map((day) => {
        const start = availability?.[day]?.start || "";
        const end = availability?.[day]?.end || "";

        const key = `${workplaceId}-${day}`;
        const conflict = conflicts?.[key];

        const isAvailable = start && end;
        const duration = calculateDuration(start, end);

        return (
          <div key={day} className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="min-w-15 font-semibold">{day}</div>

              <div className="w-22.5">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {isAvailable ? "Available" : "Not Set"}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-1">
                <input
                  type="time"
                  value={start}
                  onChange={(e) =>
                    setDayTime(workplaceId, day, "start", e.target.value)
                  }
                  className="px-3 py-2 border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                  type="time"
                  value={end}
                  onChange={(e) =>
                    setDayTime(workplaceId, day, "end", e.target.value)
                  }
                  className="px-3 py-2 border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <button
                  onClick={() => removeDay(workplaceId, day)}
                  className="h-10 w-10 flex items-center justify-center text-red-500 hover:bg-red-100 hover:text-red-600 rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            {conflict && (
              <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                ⚠ Time conflict with <b>{conflict}</b>
              </div>
            )}
            {duration && (
              <div className="text-right text-purple-600 text-sm mt-2">
                {duration}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DrConsultation;
