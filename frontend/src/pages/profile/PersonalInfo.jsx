import React, { useState } from "react";
import PhoneInput from "../../Components/PhoneInput";

const PersonalInfo = () => {
  const [phone, setPhone] = useState("");

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const labelClass = "mb-2 text-sm font-medium text-gray-600";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input type="text" className={inputClass} placeholder="Enter full name" />
        </div>

        {/* DOB */}
        <div>
          <label className={labelClass}>Date of Birth</label>
          <input type="date" className={inputClass} />
        </div>

        {/* CNIC */}
        <div>
          <label className={labelClass}>CNIC</label>
          <input type="text" className={inputClass} placeholder="xxxxx-xxxxxxx-x" />
        </div>

        {/* Phone */}
        <div>
          <div className="mt-1">
            <PhoneInput  label="Phone Number" value={phone} onChange={setPhone} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" className={inputClass} placeholder="example@email.com" />
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>Gender</label>
          <select className={inputClass}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Blood Group */}
        <div>
          <label className={labelClass}>Blood Group</label>
          <select className={inputClass}>
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

        {/* Address */}
        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Enter full address"
          />
        </div>

      </div>
    </div>
  );
};

export default PersonalInfo;