// (for total clients, appointments, classes, services).
// import client from "../../../Icons/client.svg";
// import appointment from "../../../Icons/Appointment.svg";
// import classes from "../../../Icons/classes.svg";
// import services from "../../../Icons/services.svg";
const StatsCard=()=> {
  return (
    <div className="font-secondary flex justify-between mr-16 mt-3">
      <div className="rounded-[20px] bg-(--color-darker) w-[22%] px-4">
        <div className="flex justify-between py-4">
          <div className="w-14.25 h-13.75 rounded-[15px] bg-white/20 flex justify-center items-center">
            {/* <img src={client} alt="" className="h-10.5 w-10.5" /> */}
          </div>
          <p className="font-black text-[32px]">52</p>
        </div>
        <p className="text-[12px] font-semibold p-2">Total Clients</p>
      </div>
      <div className="rounded-[20px] bg-(--color-darker) w-[22%] px-4">
        <div className="flex justify-between py-4">
          <div className="w-14.25 h-13.75 rounded-[15px] bg-white/20 flex justify-center items-center">
            {/* <img src={appointment} alt="" className="h-10.5 w-10.5" /> */}
          </div>
          <p className="font-black text-[32px]">6</p>
        </div>
        <p className="text-[12px] font-semibold p-2">Upcoming Appointments</p>
      </div>
      <div className="rounded-[20px] bg-(--color-darker) w-[22%] px-4">
        <div className="flex justify-between py-4">
          <div className="w-14.25 h-13.75 rounded-[15px] bg-white/20 flex justify-center items-center">
            {/* <img src={classes} alt="" className="h-10.5 w-10.5" /> */}
          </div>
          <p className="font-black text-[32px]">4</p>
        </div>
        <p className="text-[12px] font-semibold p-2">Total Classes</p>
      </div>
      <div className="rounded-[20px] bg-(--color-darker) w-[22%] px-4">
        <div className="flex justify-between py-4">
          <div className="w-14.25 h-13.75 rounded-[15px] bg-white/20 flex justify-center items-center">
            {/* <img src={services} alt="" className="h-10.5 w-10.5" /> */}
          </div>
          <p className="font-black text-[32px]">12</p>
        </div>
        <p className="text-[12px] font-semibold p-2">Total Services</p>
      </div>
    </div>
  );
}
export default StatsCard;