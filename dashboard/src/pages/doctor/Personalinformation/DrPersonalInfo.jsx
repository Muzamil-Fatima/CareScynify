import React, { useState } from "react";
import PhoneInput from "../../../components/PhoneInput";
const DrPersonalInfo = ({ drForm, setDrForm }) => {
  const [phone, setPhone] = useState("");

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Dr Name</label>
            <input
              value={drForm.drName}
              onChange={(e) => {
                setDrForm({ ...drForm, drName: e.target.value });
              }}
              type="text"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">DOB</label>
            <input
              value={drForm.drDob}
              onChange={(e) => {
                setDrForm({ ...drForm, drDob: e.target.value });
              }}
              type="date"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">CNIC</label>
            <input
              value={drForm.drCnic}
              onChange={(e) => {
                setDrForm({ ...drForm, drCnic: e.target.value });
              }}
              type="text"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <PhoneInput value={phone} onChange={setPhone} />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Email</label>
            <input
              value={drForm.drEmail}
              onChange={(e) => {
                setDrForm({ ...drForm, drEmail: e.target.value });
              }}
              type="email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Address</label>
            <textarea
              value={drForm.drAddress}
              onChange={(e) => {
                setDrForm({ ...drForm, drAddress: e.target.value });
              }}
              type="text"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrPersonalInfo;
