const Buttons = ({ pendingAppointment }) => {
  return (
    <div className="flex space-x-1.5">
      <button
        onClick={pendingAppointment}
        className="w-35 h-13.75 rounded-[15px] bg-[#FF9500] flex justify-center items-center"
      >
        <span>?</span>
        <span className="text-[16px] ml-1.5">Pending</span>
      </button>
      <button className="w-47.5 h-13.75 rounded-[15px] bg-(--color-primary) flex justify-center items-center mr-2">
        <span>+</span>
        <span className="text-[16px] ml-1.5">New Appointment</span>
      </button>
    </div>
  );
};
export default Buttons;
