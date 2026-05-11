import React from "react";

const HospitalDoctors = () => {
  const doctors = [
    {
      name: "Dr. Ahmed Khan",
      specialty: "Cardiologist",
      experience: "8 Years Experience",
      hospital: "City Care Hospital",
    },
    {
      name: "Dr. Sara Ali",
      specialty: "Neurologist",
      experience: "6 Years Experience",
      hospital: "Medicare Clinic",
    },
    {
      name: "Dr. Usman Tariq",
      specialty: "Orthopedic Surgeon",
      experience: "10 Years Experience",
      hospital: "Life Health Hospital",
    },
    {
      name: "Dr. Ayesha Noor",
      specialty: "Pediatrician",
      experience: "5 Years Experience",
      hospital: "Children Care Center",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Our Doctors
        </h1>
        <p className="text-gray-600 mb-8">
          Meet our experienced and qualified medical specialists
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {doctors.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition"
            >
              {/* Avatar */}
              <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold text-xl mb-4">
                {doc.name.charAt(4)}
              </div>

              {/* Name */}
              <h2 className="text-lg font-semibold text-gray-800">
                {doc.name}
              </h2>

              {/* Specialty */}
              <p className="text-blue-600 text-sm mt-1">
                {doc.specialty}
              </p>

              {/* Info */}
              <p className="text-gray-500 text-sm mt-2">
                {doc.experience}
              </p>

              <p className="text-gray-500 text-sm">
                {doc.hospital}
              </p>

              {/* Button */}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Book Appointment
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HospitalDoctors;