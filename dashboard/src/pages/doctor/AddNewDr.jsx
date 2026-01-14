import React, { useRef, useState } from "react";
const AddNewDr = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); // Ref for hidden file input

  // Function trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-8 space-y-8 relative">
        <span className="flex justify-center m-auto">
          {/* Picture Upload */}
          <div
            onClick={handleBrowseClick}
            className="relative group w-40 h-40 rounded-full  overflow-hidden cursor-pointer border-2 border-blue-500"
          >
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-full object-top rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-center">
                Click to Upload
              </div>
            )}

            {/* Camera overlay */}
            <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path d="M12 5a3 3 0 0 0-3 3h-3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3a3 3 0 0 0-3-3zm0 2a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-6 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5H6v-5z" />
              </svg>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </span>

        {/* Personal Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Dr Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">DOB</label>
              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">CNIC</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Phone split into Country Code + Number */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Phone</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="+92"
                  className="w-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="3001234567"
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Email</label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Address</label>
              <textarea
                type="text"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
        {/* Professional Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Professional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "ID",
              "Specialization",
              "Qualification",
              "License No",
              "Experience",
              "UserName",
              "Password",
            ].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="mb-2 text-gray-700">{field}</label>
                <input
                  type={field === "Password" ? "password" : "text"}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Appointment Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Appointment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Available Days</label>
              <input
                type="text"
                placeholder="e.g., Mon, Wed, Fri"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {["Add", "Update", "Clear", "Delete"].map((btn) => (
            <button
              key={btn}
              className={`px-4 py-2 rounded-lg text-white ${
                btn === "Delete"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddNewDr;
