import { useEffect, useState } from "react";
import image from "../../../Icons/sort-down.png";

const RoleDropDown = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected, setSelected] = useState("Select Role");
  const options = ["Admin", "Editor", "Monitor"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen1(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="font-medium text-xl flex gap-2 font-secondary">
      <div>
        <div className="dropdown w-77.75 h-13.75 rounded-xl bg-(--color-darker) flex justify-between items-center px-4">
          {selected}
          <img
            className={` w-6 h-6 cursor-pointer transition-transform duration-300 ${
              isOpen1 ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setIsOpen1(!isOpen1)}
            src={image}
            alt="toggle"
          />
        </div>
        {isOpen1 && (
          <div className="absolute mt-3 rounded-2xl">
            {options.map((option, index) => {
              return (
                <div
                  className="dropdown bg-(--color-darker) w-77.75 px-4 py-3 hover:border-(--color-primary) hover:border-2  border-dashed hover:rounded-2xl cursor-pointer"
                  key={index}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen1(false);
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default RoleDropDown;
