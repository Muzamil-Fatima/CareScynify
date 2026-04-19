import React from "react";
import { useDoctor } from "../../hooks/useDoctor";
import DoctorCard from "../../Components/DoctorCard";

const Doctor = () => {
  const { doctors } = useDoctor();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Find Doctors
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
};

export default Doctor;