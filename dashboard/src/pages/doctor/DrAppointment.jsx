import { useState } from "react";
import Search from "../../components/SearchBox";
import AllAppointment from "../../components/appointments/AllAppointment";
import Buttons from "../../components/appointments/Buttons";
import PendingAppointment from "../../components/appointments/PendingAppointment";
import Toggle from "../../components/appointments/Toggle";
import GridAppointment from "../../components/appointments/GridAppointment";

const DrAppointment = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-1 w-full overflow-x-hidden box-border">
      {/* Top Banner Control Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-1">
        <div>
          <h2 className="text-3xl font-bold font-secondary text-slate-900 tracking-tight">
            Appointments Matrix
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Review real-time scheduling channels, manage pipeline queries, and alter system entries.
          </p>
        </div>
        
        <Buttons setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>

      {/* View Engine Selector Bar */}
      <div className="mb-6">
        <Toggle activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Dynamic Render Switch Matrix */}
      <div className="mt-2">
        {activeTab === "grid" && <GridAppointment />}
        {activeTab === "all" && <AllAppointment />}
        {activeTab === "pending" && <PendingAppointment />}
      </div>
    </div>
  );
};

export default DrAppointment;