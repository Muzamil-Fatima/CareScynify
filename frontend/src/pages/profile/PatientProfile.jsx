import React from "react";
import usePatientProfile from "../../hooks/usePatientProfile";
import ProfileCard from "./ProfileCard";
import EditProfileForm from "./EditProfileForm";
import MedicalHistory from "./MedicalHistory";
import EmergencyContact from "./EmergencyContact";
const PatientProfile = () => {
  const { patient, loading, updatePatient } = usePatientProfile();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <ProfileCard patient={patient} />

      <EditProfileForm patient={patient} updatePatient={updatePatient} />

      <MedicalHistory patient={patient} />
      <EmergencyContact patient={patient} />
    </div>
  );
};

export default PatientProfile;
