import React from "react";
import { useParams } from "react-router-dom";

import { useClinicProfile } from "../../hooks/useClinicProfile";

import ClinicProfileHeader from "../../Components/clinic/ClinicProfileHeader";
import ClinicAbout from "../../Components/clinic/ClinicAbout";
import ClinicServices from "../../Components/clinic/ClinicServices";
import ClinicDoctors from "../../Components/clinic/ClinicDoctors";
import ClinicFacilities from "../../Components/clinic/ClinicFacilities";
import ClinicGallery from "../../Components/clinic/ClinicGallery";
import ClinicLocation from "../../Components/clinic/ClinicLocation";
import ClinicReviews from "../../Components/clinic/ClinicReviews";
import ClinicAppointmentCard from "../../Components/clinic/ClinicAppointmentCard";

const ClinicDetail = () => {
  const { id } = useParams();
  const { clinic, loading, error } = useClinicProfile(id);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading clinic details...
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
      <ClinicProfileHeader
        clinic={clinic}
        onBook={() => alert("Book appointment clicked")}
      />

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* LEFT SIDE (MAIN CONTENT) */}
        <div className="lg:col-span-2 space-y-6">

          <ClinicAbout clinic={clinic} />

          <ClinicServices services={clinic?.services} />

          <ClinicDoctors doctors={clinic?.doctors} />

          <ClinicFacilities facilities={clinic?.facilities} />

          <ClinicGallery images={clinic?.images} />

          <ClinicLocation clinic={clinic} />

          <ClinicReviews reviews={clinic?.reviews} />

        </div>

        {/* RIGHT SIDE (BOOKING CARD) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">

            <ClinicAppointmentCard
              clinic={clinic}
              onBook={(data) =>
                console.log("Booking data:", data)
              }
            />

          </div>
        </div>

      </div>
    </div>
  );
};

export default ClinicDetail;