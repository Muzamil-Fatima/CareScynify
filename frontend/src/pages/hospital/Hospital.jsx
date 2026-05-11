import React from "react";

import HospitalProfileHeader from "../../Components/hospital/HospitalProfileHeader";
import HospitalSearchBar from "../../Components/hospital/HospitalSearchBar";
import HospitalFilters from "../../Components/hospital/HospitalFilters";
import HospitalList from "../../Components/hospital/HospitalList";
import HospitalDepartments from "../../Components/hospital/HospitalDepartments";
import HospitalServices from "../../Components/hospital/HospitalServices";

const Hospital = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <HospitalProfileHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Search */}
        <HospitalSearchBar />

        {/* Filters */}
        <HospitalFilters />

        {/* Hospital List */}
        <HospitalList />

        {/* Departments */}
        <HospitalDepartments />

        {/* Services */}
        <HospitalServices />
      </div>
    </div>
  );
};

export default Hospital;
