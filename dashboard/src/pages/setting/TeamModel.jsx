import { useEffect, useRef } from "react";
import Search from "../../Component/Search";
import add from "../../../Icons/add.svg";
import RoleDropDown from "./RoleDropDown";

const TeamModel = ({ isOpen, onClose }) => {
  const teamRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (teamRef.current && !teamRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      ref={teamRef}
      className="absolute right-0 mt-3 mr-10 bg-[#1E1E1E] text-white rounded-[15px] shadow-lg p-5 w-178.5 h-auto z-50"
    >
      <div className="mb-4">
        <div className="inline-block mr-4 align-top">
          <Search searchPlace="Email" />
        </div>
        <div className="inline-block align-top">
          <RoleDropDown />
        </div>
      </div>
      <button className="mt-8 mb-4 w-31 h-13.75 rounded-[15px] bg-(--color-primary) flex justify-center items-center">
        <img src={add} className="h-6 w-6" />
        <span className="text-[16px] ml-1.5">Add</span>
      </button>
    </div>
  );
};
export default TeamModel;
