import React from "react";
import { useDoctor } from "../../hooks/useDoctor";

const DoctorProfile = () => {
  const { selectedDoctor } = useDoctor();

  if (!selectedDoctor) {
    return <div className="p-10 text-center">No doctor selected</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* Top Section */}
        <div className="flex gap-6">
          <img
            src={selectedDoctor.image}
            alt={selectedDoctor.name}
            className="w-32 h-32 rounded-xl"
          />

          <div>
            <h1 className="text-2xl font-bold">{selectedDoctor.name}</h1>
            <p className="text-blue-600">{selectedDoctor.specialization}</p>
            <p className="text-gray-500">{selectedDoctor.experience}</p>
            <p className="mt-2">⭐ {selectedDoctor.rating}</p>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-600">{selectedDoctor.about}</p>
        </div>

        {/* Services */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <ul className="list-disc ml-6 text-gray-600">
            {selectedDoctor.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Bottom Fiverr-style CTA */}
        <div className="mt-8 border-t pt-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Consultation Fee</p>
            <h3 className="text-xl font-bold">Rs. 2000</h3>
          </div>

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">
            Book Appointment
          </button>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;