import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPatient from "../PatientProfile/AddPatients";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospital";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReview";
const actions = [
  {
    title: "Add Patient",
    icon: <PersonAddAltRoundedIcon />,
    color: "#16a34a",
    bg: "#ecfdf5",
    path: "/doctor/add-patient",
  },
  {
    title: "Create Appointment",
    icon: <EventNoteRoundedIcon />,
    color: "#4f46e5",
    bg: "#eef2ff",
    path: "/doctor/appointments",
  },
  {
    title: "Manage Workplace",
    icon: <LocalHospitalRoundedIcon />,
    color: "#0ea5e9",
    bg: "#e0f2fe",
    path: "/workplace/schedule",
  },
  {
    title: "View Appointments",
    icon: <AddRoundedIcon />,
    color: "#f59e0b",
    bg: "#fffbeb",
    path: "/doctor/appointments",
  },
  {
    title: "Patient Reviews",
    icon: <RateReviewRoundedIcon />,
    color: "#7c3aed",
    bg: "#f3e8ff",
    path: "/doctor/reviews",
  },
];

const QuickActionsCard = () => {
  const navigate = useNavigate();
  const [openAddPatient, setOpenAddPatient] = useState(false);

  const handleActionClick = (action) => {
    if (action.title === "Add Patient") {
      setOpenAddPatient(true);
    } else {
      navigate(action.path);
    }
  };
  return (
    <div className="w-full rounded-[22px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_10px_25px_rgba(0,0,0,0.04)]">
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-bold text-slate-900 text-[1.1rem] sm:text-[1.25rem] md:text-[1.4rem]">
            Quick Actions
          </h2>

          <p className="mt-1 text-slate-500 text-[0.8rem] sm:text-[0.9rem] md:text-[0.95rem]">
            Fast access to important tasks
          </p>
        </div>

        {/* Actions Grid */}
        <div
          className="
            grid
            gap-4
            w-full
            grid-cols-[repeat(auto-fit,minmax(140px,1fr))]
            sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
            lg:grid-cols-5
          "
        >
          {actions.map((action, index) => (
            <div
              key={index}
              onClick={() => handleActionClick(action)}
              className="
                w-full
                min-h-25
                md:min-h-30
                rounded-2xl
                border
                border-transparent
                cursor-pointer
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-slate-200
                hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]
                flex
                items-center
                p-4
                md:p-5
              "
              style={{
                backgroundColor: action.bg,
              }}
            >
              <div className="flex flex-col gap-3">
                <div
                  className="
                    w-10 h-10 md:w-12 md:h-12 rounded-xl
                    flex
                    items-center
                    justify-center
                    bg-white
                  "
                  style={{
                    color: action.color,
                  }}
                >
                  <div className="text-[1.2rem] md:text-[1.5rem]">
                    {action.icon}
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900 text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] leading-[1.3]">
                  {action.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddPatient
  open={openAddPatient}
  onClose={() => setOpenAddPatient(false)}
/>
    </div>
  );
};

export default QuickActionsCard;
