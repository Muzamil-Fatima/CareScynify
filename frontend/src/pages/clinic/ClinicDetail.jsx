import React from "react";
import { useClinic } from "../../hooks/useClinic";
import { useNavigate } from "react-router-dom";

const ClinicDetail = () => {
  const { selectedClinic } = useClinic();
  const navigate = useNavigate();

  if (!selectedClinic) {
    return <div className="p-10 text-center">No clinic selected</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Clinic Info */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">{selectedClinic.name}</h1>
        <p className="text-gray-500">{selectedClinic.address}</p>
        <p className="mt-2">📞 {selectedClinic.phone}</p>
        <p>⭐ {selectedClinic.rating}</p>
      </div>

      {/* Doctors List */}
      <h2 className="text-xl font-bold mt-6 mb-3">
        Doctors in this Clinic
      </h2>

      <div className="grid gap-4">
        {selectedClinic.doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{doc.name}</h3>
              <p className="text-sm text-gray-500">{doc.specialization}</p>
              <p className="text-sm">{doc.experience}</p>
            </div>

            <button
              onClick={() => navigate(`/doctor/${doc.id}`)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              View & Book
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ClinicDetail;