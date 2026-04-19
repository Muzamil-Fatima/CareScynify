import React from "react";
import { useHospital } from "../../hooks/useHospital";
import { useNavigate } from "react-router-dom";

const HospitalDetail = () => {
  const { selectedHospital } = useHospital();
  const navigate = useNavigate();

  if (!selectedHospital) {
    return <div className="p-10 text-center">No hospital selected</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Hospital Info */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">{selectedHospital.name}</h1>
        <p className="text-gray-500">{selectedHospital.address}</p>
        <p className="mt-2">📞 {selectedHospital.phone}</p>
        <p>⭐ {selectedHospital.rating}</p>
      </div>

      {/* Departments */}
      <h2 className="text-xl font-bold mt-6 mb-3">
        Departments
      </h2>

      <div className="space-y-4">
        {selectedHospital.departments.map((dept) => (
          <div key={dept.id} className="bg-white p-4 rounded-xl shadow">

            <h3 className="font-semibold text-lg">
              🏥 {dept.name}
            </h3>

            {/* Doctors */}
            <div className="mt-3 space-y-2">
              {dept.doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.specialization} • {doc.experience}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/doctor/${doc.id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default HospitalDetail;