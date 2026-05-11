import React from "react";

const HospitalServices = () => {
  const services = [
    {
      title: "Emergency Care",
      desc: "Immediate treatment for critical conditions 24/7",
    },
    {
      title: "Surgery",
      desc: "Advanced surgical procedures with expert surgeons",
    },
    {
      title: "Outpatient Services",
      desc: "Consultation with doctors without admission",
    },
    {
      title: "Diagnostic Lab",
      desc: "Accurate medical tests and reports",
    },
    {
      title: "Pharmacy",
      desc: "On-site medicine availability for patients",
    },
    {
      title: "Maternity Care",
      desc: "Complete care for mothers and newborns",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Hospital Services
        </h1>
        <p className="text-gray-600 mb-8">
          Explore all medical services we provide for patient care
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-blue-600">
                {service.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {service.desc}
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

export default HospitalServices;