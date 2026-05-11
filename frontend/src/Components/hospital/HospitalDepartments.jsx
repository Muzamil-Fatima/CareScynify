import React from "react";

const HospitalDepartments = () => {
  const departments = [
    {
      name: "Cardiology",
      desc: "Heart care and cardiovascular treatment",
    },
    {
      name: "Neurology",
      desc: "Brain and nervous system specialists",
    },
    {
      name: "Orthopedics",
      desc: "Bone, joint, and muscle treatment",
    },
    {
      name: "Pediatrics",
      desc: "Child healthcare and treatment",
    },
    {
      name: "Dermatology",
      desc: "Skin, hair, and nail care",
    },
    {
      name: "Emergency",
      desc: "24/7 emergency medical services",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Hospital Departments
        </h1>
        <p className="text-gray-600 mb-8">
          Explore all medical departments available in our hospital
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {dept.name}
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                {dept.desc}
              </p>

              <button className="mt-4 text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                View Doctors
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HospitalDepartments;