import React from "react";
import PhoneInput from "../../../components/PhoneInput";
import { useDoctor } from "../../../context/doctor/DoctorContext";

const DrPersonalInfo = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const user = profile.user || {};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Dr Name</label>
          <input
            value={user.name || ""}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  name: value,
                },
              }));

              setIsDirty(true);
            }}
            type="text"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* DOB */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">DOB</label>
          <input
            value={user.dob || ""}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  dob: value,
                },
              }));

              setIsDirty(true);
            }}
            type="date"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* CNIC */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">CNIC</label>
          <input
            value={user.cnic || ""}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  cnic: value,
                },
              }));

              setIsDirty(true);
            }}
            type="number"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div>
          <PhoneInput
            value={user.phone || ""}
            onChange={(value) => {
              setProfile((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  phone: value,
                },
              }));

              setIsDirty(true);
            }}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Email</label>
          <input
            value={user.email || ""}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  email: value,
                },
              }));

              setIsDirty(true);
            }}
            type="email"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Address</label>
          <textarea
            value={user.address || ""}
            onChange={(e) => {
              const value = e.target.value;

              setProfile((prev) => ({
                ...prev,
                user: {
                  ...prev.user,
                  address: value,
                },
              }));

              setIsDirty(true);
            }}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default DrPersonalInfo;
