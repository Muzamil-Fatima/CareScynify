import React from "react";
import PhoneInput from "../../Components/PhoneInput";
import { usePatient } from "../../context/patients/PatientContext";

const PersonalInfo = () => {
  const { profile, setProfile } = usePatient();

  const user = profile?.user || {};
  const patient = profile?.patient || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const labelClass = "mb-2 text-sm font-medium text-gray-600";

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      patient: {
        ...(prev.patient || {}),
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* NAME (USER) */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            className={inputClass}
            value={user?.name || ""}
            readOnly
          />
        </div>

        {/* DOB */}
        <div>
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            className={inputClass}
            value={patient?.dob || ""}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        {/* CNIC */}
        <div>
          <label className={labelClass}>CNIC</label>
          <input
            type="text"
            className={inputClass}
            value={patient?.cnic || ""}
            onChange={(e) => handleChange("cnic", e.target.value)}
          />
        </div>

        {/* PHONE */}
        <div>
          <label className={labelClass}>Phone</label>
          <PhoneInput
            value={patient?.phone || ""}
            onChange={(val) => handleChange("phone", val)}
          />
        </div>

        {/* EMAIL (USER) */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            value={user?.email || ""}
            readOnly
          />
        </div>

        {/* GENDER */}
        <div>
          <label className={labelClass}>Gender</label>
          <select
            className={inputClass}
            value={patient?.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* BLOOD GROUP */}
        <div>
          <label className={labelClass}>Blood Group</label>
          <select
            className={inputClass}
            value={patient?.bloodGroup || ""}
            onChange={(e) => handleChange("bloodGroup", e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* ADDRESS */}
        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <textarea
            rows={3}
            className={inputClass}
            value={patient?.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

      </div>
    </div>
  );
};

export default PersonalInfo;