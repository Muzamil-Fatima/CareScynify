import { useNavigate } from "react-router-dom";
const AppointmentDetailsModal = ({
  isOpen,
  appointment,
  onClose,
  getStatusClasses,
}) => {
  const navigate = useNavigate();
const openPatientProfile = (patient) => {
  navigate(`/doctor/patient/profile/${patient}`);
};
  if (!isOpen || !appointment) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 z-99999 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button and Avatar */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center ring-4 ring-purple-50">
              {appointment.avatar ? (
                <img
                  src={appointment.avatar}
                  alt={appointment.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-purple-700 font-bold text-lg">
                  {appointment.title?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-950">
                {appointment.title}
              </h2>
              <p className="text-sm text-slate-500">ID: {appointment.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50"
          >
            ✕
          </button>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase">
              Date
            </p>
            <p className="text-sm font-semibold">{appointment.dateFormatted}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase">
              Time
            </p>
            <p className="text-sm font-semibold">
              {appointment.startTimeFormatted} - {appointment.endTimeFormatted}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase">
              Workplace
            </p>
            <p className="text-sm font-semibold">
              {appointment.workplace || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase">
              Location
            </p>
            <p className="text-sm font-semibold">
              {appointment.location || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase">
              Phone
            </p>
            <p className="text-sm font-semibold">
              {appointment.phone || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-purple-700 uppercase">
              Email
            </p>
            <p className="text-sm font-semibold">
              {appointment.email || "N/A"}
            </p>
          </div>

          <div className="md:col-span-2 flex items-center gap-2 pt-2">
            <span className="text-xs font-bold text-slate-500">
              Appointment:
            </span>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ring-2 ${getStatusClasses(
                appointment.status,
              )}`}
            >
              {appointment.status || "Pending"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold bg-slate-50 rounded-xl"
          >
            Close
          </button>

          <button
            onClick={() => openPatientProfile(appointment.patientId)}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl cursor-pointer"
          >
            View Full Patient Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
