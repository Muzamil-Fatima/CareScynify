import React, { useState } from "react";
const DrAppointmentDetails = () => {
  const [availableDays, setAvailableDays] = useState([]);
  const handleDayChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setAvailableDays([...availableDays, value]);
    } else {
      setAvailableDays(availableDays.filter((day) => day !== value));
    }
  };
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Appointment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Available Days</label>

            <div className="grid grid-cols-4 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={day}
                    className="accent-blue-500"
                    onChange={handleDayChange}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Consultation Hours</label>
            <input
              type="text"
              placeholder="e.g., 10:00 AM - 2:00 PM"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Room No.</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Appointment Duration</label>
            <input
              type="text"
              placeholder="e.g., 30 mins"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Status</label>
            <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2 text-gray-700">
              Note
            </label>
            <textarea
              name=""
              id=""
              placeholder="Enter a short note for patients"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrAppointmentDetails;
