import React from "react";
import DrSpecialization from "./DrSpecialization";
const DrProfessionalDetail = ({ drForm, setDrForm }) => {
  const fields = [
    { name: "ID", type: "text" },
    { name: "Specialization", type: "specialization" },
    { name: "Qualification", type: "text" },
    { name: "License No", type: "text" },
    { name: "Experience", type: "text" },
    { name: "UserName", type: "text" },
    { name: "Password", type: "password" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Professional Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-2 text-gray-700">{field.name}</label>

            {field.type === "specialization" ? (
              <DrSpecialization
                value={drForm[field.name] || ""}
                onChange={(e) =>
                  setDrForm({ ...drForm, [field.name]: e.target.value })
                }
              />
            ) : (
              <input
                value={drForm[field.name] || ""}
                onChange={(e) => {
                  setDrForm({ ...drForm, [field.name]: e.target.value });
                }}
                type={field.type === "password" ? "password" : "text"}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default DrProfessionalDetail;
