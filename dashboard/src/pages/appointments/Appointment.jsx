import { useState } from "react";
import Search from "../../components/SearchBox"
import AllAppointment from "./AllAppointment";
import Buttons from "./Buttons";
import PendingAppointment from "./PendingAppointment";
import Decide from "./Decide";
import GridAppointment from "./GridAppointment";

const Appointment = ()=> {
  const [pendingAppointment, setPendingAppointment] = useState(false);
  const [grid, setGrid] = useState(false);

  return (
    <>
      <h2 className="font-bold text-[40px] font-secondary mt-4">
        Appointments
      </h2>
      <div className="flex justify-between">
        <Search />
        <Buttons pendingAppointment={() => setPendingAppointment(true)} />
      </div>
      <Decide grid={() => setGrid(true)} />
      {/* Conditional Render  */}
      <div>
        {pendingAppointment ? (
          <PendingAppointment />
        ) : grid ? (
          <GridAppointment />
        ) : (
          <AllAppointment />
        )}
      </div>
    </>
  );
}
export default Appointment;