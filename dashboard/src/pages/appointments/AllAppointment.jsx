import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/api.js";
import axios from "axios";

const AllAppointment = () => {
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/appointment/allAppointments`);
        setAppointment(res.data.data || []);
      } catch (error) {
        toast.error("Error: " + (error.response?.data.message || error.message));
      }
    };
    fetchAppointment();
  }, []);

  return (
    <div className="border border-slate-200 bg-white rounded-2xl shadow-xl shadow-purple-950/2 overflow-hidden">
      {/* Header Matrix Block */}
      <div className="p-4 px-6 bg-slate-50/60 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-700">Active Patients Logs Stack</h3>
        <span className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-lg border border-purple-100">
          Total: {appointment.length} Record Units
        </span>
      </div>

      {/* Content Dynamic Body */}
      <div className="divide-y divide-slate-100">
        {appointment.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400 font-medium">
            No appointments loaded in current channel database logs frame.
          </div>
        ) : (
          appointment.map((item, index) => (
            <div 
              key={item._id || item.id || index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 px-6 transition-colors duration-150 hover:bg-slate-50/40"
            >
              {/* Identity Left Column */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center border border-purple-100 text-sm">
                  {item.patient?.name ? item.patient.name.charAt(0).toUpperCase() : "P"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{item.patient?.name || "Anonymous Patient"}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ID Token: <span className="text-purple-600 font-semibold uppercase">{String(item._id || item.id).slice(-6)}</span>
                  </p>
                </div>
              </div>

              {/* Parameters Right Column */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 w-full sm:w-auto mt-4 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="min-w-25">
                  <p className="text-sm font-bold text-slate-700">{item.time || "12:00 PM"}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.date ? new Date(item.date).toLocaleDateString() : "Scheduled Day"}
                  </p>
                </div>

                {/* Badge Indicator View */}
                <div>
                  <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
                    item.status === "Pending"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}>
                    {item.status || "Confirmed"}
                  </span>
                </div>

                {/* Option Menu Action */}
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 10a2 2 0 100 4 2 2 0 000-4zM12 4a2 2 0 100 4 2 2 0 000-4zM12 16a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointment;