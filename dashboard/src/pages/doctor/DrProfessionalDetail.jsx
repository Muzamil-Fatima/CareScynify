import React from "react";

const DrProfessionalDetail = () => {
  return (
    <div>
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
    </div>
  );
};

export default DrProfessionalDetail;
