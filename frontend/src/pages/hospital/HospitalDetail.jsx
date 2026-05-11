import React from "react";

import HospitalProfileHeader from "../../Components/hospital/HospitalProfileHeader";
import HospitalServices from "../../Components/hospital/HospitalServices";
import HospitalDoctors from "../../Components/hospital/HospitalDoctors";
import HospitalReviews from "../../Components/hospital/HospitalReviews";
import HospitalLocation from "../../Components/hospital/HospitalLocation";

const HospitalDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <HospitalProfileHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* About Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            About Hospital
          </h2>
          <p className="text-gray-600">
            This hospital provides advanced healthcare services with modern
            facilities, experienced doctors, and 24/7 emergency support.
          </p>
        </div>

        {/* Services */}
        <HospitalServices />

        {/* Doctors */}
        <HospitalDoctors />

        {/* Location */}
        <HospitalLocation />

        {/* Reviews */}
        <HospitalReviews />
      </div>
    </div>
  );
};

export default HospitalDetail;
