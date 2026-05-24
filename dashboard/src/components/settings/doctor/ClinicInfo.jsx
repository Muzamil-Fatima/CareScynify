import React, { useState } from "react";
import toast from "react-hot-toast";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

const ClinicInfo = () => {
  const [clinicDetails, setClinicDetails] = useState({
    clinicName: "CareScynify General Clinic",
    consultationFee: "1500",
    emergencyContact: "+92 300 9876543",
    startTime: "09:00",
    endTime: "17:00",
    address: "Suite 404, Medical Center Tower, Phase 6, DHA",
    city: "Karachi",
    services: "General Checkup, Pediatrics, Cardiovascular Screening",
    acceptingNewPatients: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClinicDetails({
      ...clinicDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Yahan aap apni backend API integration kar sakte hain
    toast.success("Clinic details updated successfully!");
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Header Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <LocalHospitalOutlinedIcon className="text-purple-600" />
          Clinic Information
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure your clinic workspace setup, operating hours, fees, and location details for patients.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Core Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Clinic Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Clinic Practice Name
            </label>
            <input
              type="text"
              name="clinicName"
              value={clinicDetails.clinicName}
              onChange={handleInputChange}
              placeholder="e.g. Family Care Hospital"
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
              required
            />
          </div>

          {/* Consultation Fee */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <PaymentsOutlinedIcon fontSize="inherit" /> Consultation Fee (PKR)
            </label>
            <input
              type="number"
              name="consultationFee"
              value={clinicDetails.consultationFee}
              onChange={handleInputChange}
              placeholder="e.g. 2000"
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
              required
            />
          </div>

          {/* Emergency Helpline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Clinic Emergency Contact
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={clinicDetails.emergencyContact}
              onChange={handleInputChange}
              placeholder="e.g. +92 21 3456789"
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
            />
          </div>

          {/* Availability Status */}
          <div className="space-y-1.5 flex flex-col justify-end pb-3">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                name="acceptingNewPatients"
                checked={clinicDetails.acceptingNewPatients}
                onChange={handleInputChange}
                className="w-4 h-4 accent-purple-600 rounded-sm shrink-0 cursor-pointer"
              />
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition">
                  Accepting New Patients
                </p>
                <p className="text-xs text-slate-400">
                  Visible publicly on your booking schedule panel.
                </p>
              </div>
            </label>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Timings Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <AccessTimeOutlinedIcon fontSize="small" className="text-slate-400" />
            Operating Timings
          </h4>
          <div className="grid grid-cols-2 gap-5 max-w-md">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Opening Hours</label>
              <input
                type="time"
                name="startTime"
                value={clinicDetails.startTime}
                onChange={handleInputChange}
                className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-600 transition"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Closing Hours</label>
              <input
                type="time"
                name="endTime"
                value={clinicDetails.endTime}
                onChange={handleInputChange}
                className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-600 transition"
                required
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Location Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <LocationOnOutlinedIcon fontSize="small" className="text-slate-400" />
            Clinic Location Address
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Street Address</label>
              <input
                type="text"
                name="address"
                value={clinicDetails.address}
                onChange={handleInputChange}
                placeholder="Building, Floor, Street Info"
                className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-600 transition"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={clinicDetails.city}
                onChange={handleInputChange}
                placeholder="e.g. Lahore"
                className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-600 transition"
                required
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Medical Services Provided */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Clinical Services Provided
          </label>
          <textarea
            name="services"
            value={clinicDetails.services}
            onChange={handleInputChange}
            rows={3}
            placeholder="Separate services with commas (e.g. Consultant Cardiology, Echo, ECG, Emergency Care)"
            className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition resize-none"
          />
          <p className="text-[11px] text-slate-400">
            Comma separation helps categorize your operations smoothly on customer searches.
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
          >
            Save Clinic Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClinicInfo;