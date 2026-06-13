import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDoctorProfile } from "../../hooks/useDoctorProfile";

import DoctorProfileHeader from "../../Components/doctor/DoctorProfileHeader";
import DoctorExperience from "../../Components/doctor/DoctorExperience";
import DoctorAvailability from "../../Components/doctor/DoctorAvailability";
import DoctorReviews from "../../Components/doctor/DoctorReviews";
import DoctorQuestions from "../../Components/doctor/DoctorQuestions";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { doctor, loading } = useDoctorProfile(id);

  if (loading && !doctor) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!doctor) {
    return <div className="text-center py-10">Doctor not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* HEADER */}
      <DoctorProfileHeader
        doctor={doctor}
        onBook={() => navigate(`/doctor/${id}/book`)}
      />

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <DoctorExperience doctor={doctor} />
          <DoctorAvailability doctor={doctor} />
          <DoctorReviews doctor={doctor} />
          <DoctorQuestions doctor={doctor} />
        </div>

        {/* RIGHT SIDE (optional future use) */}
        <div className="lg:col-span-1"></div>

      </div>
    </div>
  );
};

export default DoctorProfile;