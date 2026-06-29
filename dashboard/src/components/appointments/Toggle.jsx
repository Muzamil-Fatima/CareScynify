import React, { useContext } from "react";
import DoctorContext from "../../context/doctor/DoctorContext";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ViewAgendaRoundedIcon from "@mui/icons-material/ViewAgendaRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const Toggle = ({ activeTab, setActiveTab }) => {
  const { profile, activeWorkplaceId, setActiveWorkplaceId } =
    useContext(DoctorContext);

  const workplaces = profile?.doctor?.workplaces || [];
  const allWorkplaces = [{ _id: "all", name: "All Workplaces" }, ...workplaces];

  const currentIndex = allWorkplaces.findIndex(
    (w) => w._id === activeWorkplaceId,
  );

  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const current = allWorkplaces[safeIndex]?.name || "All Workplaces";

  const handleNext = () => {
    const nextIndex = (safeIndex + 1) % allWorkplaces.length;
    setActiveWorkplaceId(allWorkplaces[nextIndex]._id);
  };

  const handlePrev = () => {
    const prevIndex =
      (safeIndex - 1 + allWorkplaces.length) % allWorkplaces.length;
    setActiveWorkplaceId(allWorkplaces[prevIndex]._id);
  };

  if (!allWorkplaces.length) return null;

  return (
    <div className="flex justify-between items-center px-5 py-3.5 bg-white rounded-2xl shadow-sm">
      {/* WORKPLACE SWITCH */}
      <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-2 py-1 transition hover:bg-slate-100">
        <button
          onClick={handlePrev}
          className="p-1 rounded-md hover:bg-white hover:text-purple-700 transition"
        >
          <KeyboardArrowLeftRoundedIcon />
        </button>

        <span className="text-sm font-bold text-purple-700 min-w-40 text-center">
          {current}
        </span>

        <button
          onClick={handleNext}
          className="p-1 rounded-md hover:bg-white hover:text-purple-700 transition"
        >
          <KeyboardArrowRightRoundedIcon />
        </button>
      </div>

      {/* VIEW TOGGLE */}
      <div className="flex bg-slate-50 p-1 rounded-xl transition hover:bg-slate-100">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1 transition ${
            activeTab === "all"
              ? "bg-white text-purple-700 shadow-sm"
              : "text-slate-500 hover:text-purple-600"
          }`}
        >
          <ViewAgendaRoundedIcon fontSize="small" />
          Row Feed
        </button>

        <button
          onClick={() => setActiveTab("grid")}
          className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1 transition ${
            activeTab === "grid"
              ? "bg-white text-purple-700 shadow-sm"
              : "text-slate-500 hover:text-purple-600"
          }`}
        >
          <CalendarMonthRoundedIcon fontSize="small" />
          Large Calendar
        </button>
      </div>
    </div>
  );
};

export default Toggle;
