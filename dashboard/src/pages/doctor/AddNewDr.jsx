import React, { useRef, useState } from "react";
import DrPersonalInfo from "./Personalinformation/DrPersonalInfo";
import DrProfessionalDetail from "./ProfessionalDetail/DrProfessionalDetail";
import DrAppointmentDetails from "./DrAppointmentDetails/DrAppointmentDetail";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/api.js";
const AddNewDr = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); // Ref for hidden file input
  const [drForm, setDrForm] = useState({
    drName: "",
    drDob: "",
    drCnic: "",
    phone: "",
    drEmail: "",
    drAddress: "",
    ID: "",
    Specialization: "",
    Qualification: "",
    LicenseNo: "",
    Experience: "",
    UserName: "",
    Password: "",
    availableDays: [],
    consultStart: "",
    consultEnd: "",
    drRoomNo: "",
    duration: "",
    durationUnit: "minutes",
    status: "Active",
    note: "",
  });
  // Function trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/doctor/addDr`,
        drForm,
      );
      toast.success("Application submitted successfully!");
      console.log(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <form action="" onSubmit={handleSubmit}>
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
          <DrPersonalInfo drForm={drForm} setDrForm={setDrForm} />
          {/* Professional Details */}
          <DrProfessionalDetail drForm={drForm} setDrForm={setDrForm} />
          {/* Appointment Details */}
          <DrAppointmentDetails drForm={drForm} setDrForm={setDrForm} />
          {/* Action Buttons */}
          {/* <div className="flex justify-end space-x-4">
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
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default AddNewDr;
