import { FaCheck, FaTimes } from "react-icons/fa";
const PopUp = ()=> {
  return (
    <div className="w-66.5 h-36.5 flex flex-col justify-center items-center text-[13px] bg-white rounded-xl shadow-lg p-4">
      <p className="font-extrabold text-gray-900 text-lg">Are you sure?</p>
      <p className="font-medium mt-3 mb-3 text-gray-700 text-center">
        <span className="block">Are you sure you want to</span>
        delete <span className="font-bold text-red-500">(9)</span> clients?
      </p>
      <div className="flex gap-3">
        <button className="flex items-center justify-center gap-2 w-21.25 h-7.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
          <FaCheck size={16} />
          Yes
        </button>
        <button className="flex items-center justify-center gap-2 w-21.25 h-7.5 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
          <FaTimes size={16} />
          No
        </button>
      </div>
    </div>
  );
}
export default PopUp;