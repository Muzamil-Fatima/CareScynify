import React from "react";

const AddPatient = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-107.5 rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Add Patient</h2>

          <button
            onClick={onClose}
            className=" cursor-pointer text-2xl text-slate-500 hover:text-slate-800"
          >
            x
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <input
            type="text"
            placeholder="Patient Name"
            className="w-full  p-3 outline-none  border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 outline-none  border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 shadow-[0_-2px_8px_rgba(15,23,42,0.06)]">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Cancel
          </button>

          <button className=" cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
            Save Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
