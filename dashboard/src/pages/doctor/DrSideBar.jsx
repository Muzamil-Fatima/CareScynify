// ├── Dashboard
// ├── My Clinics / Hospital
// ├── My Schedule / Availability
// ├── Appointments
// ├── Patients (read-only / limited)
// ├── Prescriptions
// ├── Profile
import React from "react";

const DrSideBar = () => {
  const [toggle, setToggle] = React.useState(true);
  const menuItem = [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard-icon" },
    { name: "My Clinics / Hospital", path: "/clinics", icon: "clinic-icon" },
    {
      name: "My Schedule / Availability",
      path: "/schedule",
      icon: "schedule-icon",
    },
    { name: "Appointments", path: "/appointments", icon: "appointment-icon" },
    {
      name: "Patients (read-only / limited)",
      path: "/patients",
      icon: "patient-icon",
    },
    {
      name: "Prescriptions",
      path: "/prescriptions",
      icon: "prescription-icon",
    },
    { name: "Profile", path: "/profile", icon: "profile-icon" },
  ];
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
        <span>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-10 h-10"
          >
            {/* Green circle */}
            <circle cx="50" cy="35" r="30" fill="#a3e635" />

            {/* Road/path */}
            <path
              d="M35 35 L50 70 L65 35"
              stroke="#60a5fa"
              strokeWidth="6"
              fill="none"
            />

            {/* Road dashed lines */}
            <path d="M49 42 L51 42" stroke="#fff" strokeWidth="2" />
            <path d="M49 50 L51 50" stroke="#fff" strokeWidth="2" />
            <path d="M49 58 L51 58" stroke="#fff" strokeWidth="2" />
          </svg>
        </span>
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

export default DrSideBar;
