import React from "react";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = ({
  appointments,
  openMenu,
  setOpenMenu,
  updateStatus,
  cancel,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible mb-3">
      {appointments.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No appointments found
        </div>
      ) : (
        appointments.map((item, index) => (
          <AppointmentCard
            key={item._id}
            item={item}
            index={index}
            total={appointments.length}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            updateStatus={updateStatus}
            cancel={cancel}
          />
        ))
      )}
    </div>
  );
};

export default AppointmentList;
