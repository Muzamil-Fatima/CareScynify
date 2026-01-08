import { useEffect, useState } from "react";
// import next from "../../../Icons/next.svg";
 const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error Fetching Appointment : ", err));
  }, []);

  return (
    <div className="font-secondary w-2/5">
      <div className="flex justify-between mb-4 px-2">
        <h2 className="font-semibold text-2xl">Appointments</h2>
        <div className="flex gap-1 items-center">
          <p className="font-normal text-[14px]">More</p>
          {/* <img src={next} className="w-3.5 h-3.5" /> */}
        </div>
      </div>
      <div className="border border-white/15 rounded-[15px]">
        {appointments.map((item, index) => (
          <div
            key={index}
            className={`font-semibold text-[15px] flex justify-between px-4 py-6 border-b border-white/15 ${
              index % 2 !== 0 ? "bg-(--color-darker)" : ""
            }`}
          >
            <p>{item.status}</p>
            <div className="flex gap-1">
              <p>{item.count}</p>
              {/* <img src={next} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AppointmentsList;