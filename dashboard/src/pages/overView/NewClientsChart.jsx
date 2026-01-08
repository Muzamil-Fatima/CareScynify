import next from "../../../Icons/next.svg";
import appointment from "../../../Icons/appointment.svg";
const NewClientChart = () => {
  return (
    <div className="">
      <div className="flex justify-between mb-4 px-2">
        <h2 className="font-semibold text-2xl">New Clients</h2>
        <div className="flex gap-1 items-center">
          <p className="font-normal text-[14px]">More</p>
          <img src={next} className="w-3.5 h-3.5" />
        </div>
      </div>
      <div>
        <div className="text-[15px] font-medium">
          <button className="flex justify-center items-center w-24.75 h-10.75 border border-white/15 rounded-4xl hover:text-(--color-primary) hover:border-(--color-primary)">
            Today
          </button>
          <button className="flex justify-center items-center w-24.75 h-10.75 border border-white/15 rounded-4xl hover:text-(--color-primary) hover:border-(--color-primary)">
            7 Days
          </button>
          <button className="flex justify-center items-center w-24.75 h-10.75 border border-white/15 rounded-4xl hover:text-(--color-primary) hover:border-(--color-primary)">
            30 Days
          </button>
          <div>
            <button className="flex justify-center items-center w-31.25 h-10.75 border border-white/15 rounded-4xl hover:text-(--color-primary) hover:border-(--color-primary)">
              <img src={appointment} className="w-4.25 h-4.25" />
              Custom
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default NewClientChart;
