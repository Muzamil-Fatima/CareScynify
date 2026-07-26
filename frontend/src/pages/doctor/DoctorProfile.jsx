import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDoctorProfile } from "../../hooks/useDoctorProfile";
import { useDoctorContext } from "../../context/doctor/DoctorContext";

import DoctorProfileHeader from "../../Components/doctor/DoctorProfileHeader";
import DoctorExperience from "../../Components/doctor/DoctorExperience";
import DoctorAvailability from "../../Components/doctor/DoctorAvailability";
import DoctorReviews from "../../Components/doctor/DoctorReviews";
import DoctorAbout from "../../Components/doctor/DoctorAbout";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedDoctor } = useDoctorContext();

  const { doctor: apiDoctor, reviews, loading } = useDoctorProfile(id);

  const doctor = apiDoctor || selectedDoctor;
  // loading  skeleton
  if (!doctor && loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!doctor && !loading) {
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
          <DoctorAbout doctor={doctor} />
          <DoctorReviews reviews={reviews} />
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <DoctorAvailability doctor={doctor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
