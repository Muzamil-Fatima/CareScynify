import { useState } from "react";
import Search from "../../components/SearchBox";
import AllAppointment from "./AllAppointment";
import Buttons from "./Buttons";
import PendingAppointment from "./PendingAppointment";
import Decide from "./Decide";
import GridAppointment from "./GridAppointment";

const Appointment = () => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div>
      <h2 className="font-bold text-3xl font-secondary mt-4">
        Appointments
      </h2>
      <div className="flex justify-between">
        <Search />
        <Buttons pendingAppointment={() => setActiveTab("pending")} />
      </div>
      <div className="mt-2">
        <Decide
          grid={() => setActiveTab("grid")}
          row={() => setActiveTab("all")}

        />
        {/* Conditional Render  */}
        <div>
          {activeTab === "grid" && <GridAppointment />}
          {activeTab === "all" && <AllAppointment />}
          {activeTab === "pending" && <PendingAppointment />}
        </div>
      </div>

      <div className="mt-2 border border-gray-300/30 rounded-[15px] bg-white shadow-sm"></div>
    </div>
  );
};
export default Appointment;
