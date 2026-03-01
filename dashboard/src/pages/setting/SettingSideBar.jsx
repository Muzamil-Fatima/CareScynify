import React from "react";
import { NavLink } from "react-router-dom";
const SettingSideBar = () => {
  const [toggle, setToggle] = React.useState(true);
  const menuItem = [{ permission: "Admin" }];
  return (
    <div
      className={` min-h-screen bg-slate-950 text-white p-2 transition-all duration-300 ${
        toggle ? "w-64" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center mb-2 p-4">
        {" "}
        <button onClick={() => setToggle(!toggle)} className=" text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <ul className="space-y-4">
        {menuItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `w-full pl-2 h-13 flex items-center rounded-lg
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-white hover:text-indigo-500 hover:border-2 hover:border-dashed hover:border-indigo-500"
     }`
            }
          >
            {item.icon}
            <span className={`ml-2 ${toggle ? "block" : "hidden"}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SettingSideBar;
