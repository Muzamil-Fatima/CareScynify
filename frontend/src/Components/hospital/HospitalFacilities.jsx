import React from "react";

const HospitalFacilities = () => {
  const facilities = [
    {
      title: "Emergency 24/7",
      desc: "Immediate medical support available day and night",
    },
    {
      title: "ICU Services",
      desc: "Advanced intensive care units with monitoring",
    },
    {
      title: "Operation Theater",
      desc: "Fully equipped modern surgical rooms",
    },
    {
      title: "Laboratory",
      desc: "Fast and accurate medical testing services",
    },
    {
      title: "Pharmacy",
      desc: "On-site pharmacy with all essential medicines",
    },
    {
      title: "Ambulance Service",
      desc: "Quick emergency transport for patients",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Hospital Facilities
        </h1>
        <p className="text-gray-600 mb-8">
          Explore the medical facilities we provide for patient care
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {facilities.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-blue-600">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {item.desc}
              </p>

              <button className="mt-4 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HospitalFacilities;