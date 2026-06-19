import React, { useState } from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";

import DrAvailabilityDetail from "../../pages/DrAvailabilityDetail";
import TotalWorkPlaces from "./TotalWorkPlaces";

const WorkPlaceSchedule = () => {
  const { profile } = useDoctor();

  const workplaces = profile?.doctor?.workplaces || [];

  const [activeWorkplaceId, setActiveWorkplaceId] = useState(null);
  const [showManager, setShowManager] = useState(false);

  // pick active workplace safely (NO useMemo needed)
  const activeWorkplace =
    workplaces.find((w) => w._id === activeWorkplaceId) ||
    workplaces[0] ||
    null;

  // FIX: only set default when user clicks or when modal opens
  const handleSelect = (id) => {
    setActiveWorkplaceId(id);
  };

  return (
    <div className="space-y-6">

      {/* SWITCHER */}
      <div className="bg-white p-3 rounded-2xl border shadow-sm flex gap-2 overflow-x-auto">

        {workplaces.map((w) => (
          <button
            key={w._id}
            onClick={() => handleSelect(w._id)}
            className={
              activeWorkplace?._id === w._id
                ? "px-4 py-2 rounded-xl bg-purple-600 text-white"
                : "px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          >
            🏥 {w.name}
          </button>
        ))}

        <button
          onClick={() => setShowManager(true)}
          className="ml-auto px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black"
        >
          Manage
        </button>

      </div>

      {/* MAIN */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">

        {activeWorkplace ? (
          <>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeWorkplace.name}
              </h2>

              <p className="text-gray-500 text-sm">
                {activeWorkplace.location}
              </p>

              <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600">
                {activeWorkplace.type}
              </span>
            </div>

            <DrAvailabilityDetail workplace={activeWorkplace} />
          </>
        ) : (
          <p className="text-gray-400">No workplace available</p>
        )}

      </div>

      {/* MODAL */}
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