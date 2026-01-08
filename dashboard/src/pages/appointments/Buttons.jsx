// import pending from "../../../Icons/pending.svg";
// import add from "../../../Icons/add.svg";
const Buttons = ({ pendingAppointment }) => {
  return (
    <div className="flex space-x-1.5">
      <button
        onClick={pendingAppointment}
        className="w-35 h-13.75 rounded-[15px] bg-[#FF9500] flex justify-center items-center"
      >
        {/* <img src={pending} className="h-6 w-6" />{" "} */}
        <span className="text-[16px] ml-1.5">Pending</span>
      </button>
      <button className="w-47.5 h-13.75 rounded-[15px] bg-(--color-primary) flex justify-center items-center mr-2">
        {/* <img src={add} className="h-6 w-6" />{" "} */}
        <span className="text-[16px] ml-1.5">New Appointment</span>
      </button>
    </div>
  );
};
export default Buttons;
