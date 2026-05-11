import React from "react";
import { useParams } from "react-router-dom";

import { useDoctorProfile } from "../../hooks/useDoctorProfile";

import DoctorProfileHeader from "../../Components/doctor/DoctorProfileHeader";
import DoctorAbout from "../../Components/doctor/DoctorAbout";
import DoctorExperience from "../../Components/doctor/DoctorExperience";
import DoctorAvailability from "../../Components/doctor/DoctorAvailability";
import DoctorReviews from "../../Components/doctor/DoctorReviews";
import DoctorQuestions from "../../Components/doctor/DoctorQuestions";
import AppointmentCard from "../../Components/doctor/AppointmentCard";

const DoctorProfile = () => {
  const { id } = useParams();
  const { doctor, loading, error } = useDoctorProfile(id);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading doctor profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-20">
      
      {/* Header */}
      <DoctorProfileHeader
        doctor={doctor}
        onBook={() => alert("Book Appointment Clicked")}
      />

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* LEFT SIDE (MAIN CONTENT) */}
        <div className="lg:col-span-2 space-y-6">

          <DoctorAbout doctor={doctor} />

          <DoctorExperience doctor={doctor} />

          <DoctorAvailability doctor={doctor} />

          <DoctorReviews doctor={doctor} />

          <DoctorQuestions doctor={doctor} />

        </div>

        {/* RIGHT SIDE (BOOKING CARD) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AppointmentCard doctor={doctor} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;