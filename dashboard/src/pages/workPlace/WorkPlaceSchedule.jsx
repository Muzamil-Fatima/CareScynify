
import React, { useState } from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";

import DrAvailabilityDetail from "./DrAvailabilityDetail";
import TotalWorkPlaces from "./TotalWorkPlaces";

const WorkPlaceSchedule = () => {
  const { profile } = useDoctor();

  const workplaces = profile.doctor?.workplaces || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [showManager, setShowManager] = useState(false);

  const activeWorkplace = workplaces[activeIndex];

  return (
    <div className="space-y-6">

      {/* WORKPLACE SWITCHER (FAST TABS) */}
      <div className="bg-white p-3 rounded-2xl border shadow-sm flex gap-2 overflow-x-auto">
        {workplaces.map((w, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              px-4 py-2 rounded-xl whitespace-nowrap transition
              ${activeIndex === i
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            {w.type === "hospital" ? "🏥" : "🏥"} {w.name}
          </button>
        ))}

        {/* MANAGE BUTTON */}
        <button
          onClick={() => setShowManager(true)}
          className="ml-auto px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black"
        >
          Manage
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        {activeWorkplace ? (
          <>
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeWorkplace.name}
              </h2>
              <p className="text-gray-500 text-sm">
                {activeWorkplace.location}
              </p>
            </div>

            {/* YOUR EXISTING COMPONENTS */}
            <DrAvailabilityDetail workplace={activeWorkplace} />
          </>
        ) : (
          <p className="text-gray-400">No workplace selected</p>
        )}
      </div>

      {/* WORKPLACE MANAGER MODAL */}
      {showManager && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6">
            <TotalWorkPlaces />
            <button
              onClick={() => setShowManager(false)}
              className="mt-4 w-full bg-gray-900 text-white py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkPlaceSchedule;