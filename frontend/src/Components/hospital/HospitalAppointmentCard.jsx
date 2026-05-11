import React from "react";

const HospitalAppointmentCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      
      {/* Header */}
      <h2 className="text-xl font-bold text-blue-600 mb-2">
        Book Appointment
      </h2>

      <p className="text-gray-500 text-sm mb-4">
        Schedule your visit with a doctor easily
      </p>

      {/* Form */}
      <form className="space-y-4">
        
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <input
            type="date"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Doctor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Doctor
          </label>
          <select className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Dr. Ahmed</option>
            <option>Dr. Sara</option>
            <option>Dr. Ali</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message (optional)
          </label>
          <textarea
            rows="3"
            placeholder="Write your problem..."
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default HospitalAppointmentCard;