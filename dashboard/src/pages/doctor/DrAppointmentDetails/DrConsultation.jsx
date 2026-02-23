import React from "react";

const DrConsultation = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700">Consultation Hours</label>

        <div className="flex items-center gap-4 ">
          {/* Start Time */}
          <div className="flex flex-col">
            <label htmlFor="start-time">Start Time</label>
            <input
              id="start-time"
              type="time"
              className="mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* End Time */}
          <div className="flex flex-col">
            <label htmlFor="end-time">End Time</label>
            <input
              id="end-time"
              type="time"
              className="mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrConsultation;
