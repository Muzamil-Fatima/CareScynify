import React, { useRef, useState } from "react";
import { Avatar, IconButton, Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import MedicalHistory from "../../components/patient/patientProfile/MedicalHistory";
import EmergencyContact from "../../components/patient/patientProfile/EmergencyContact";
import PersonalInfo from "../../components/patient/patientProfile/PersonalInfo";

import { updateUserProfile } from "../../api/userApi";
import { getPatientProfile } from "../../api/patientApi";
import { usePatient } from "../../context/patients/PatientContext";

const PatientProfile = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { profile, setProfile } = usePatient();

  // Open file picker
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  // Handle file selection + upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    // SEND TO BACKEND
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await updateUserProfile(formData);

      //  REFRESH PROFILE AFTER UPLOAD
      const data = await getPatientProfile();

      setProfile({
        user: data.user || {},
        patient: data.patient || {},
      });

      console.log("Avatar uploaded and profile refreshed");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Profile Image */}
      <div className="flex justify-center">
        <Box position="relative" display="inline-block">
          {/* Avatar */}
          <Avatar
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : profile?.user?.avatar || ""
            }
            sx={{ width: 140, height: 140 }}
          >
            {!selectedFile && "U"}
          </Avatar>

          {/* Camera Button */}
          <IconButton
            onClick={handleBrowseClick}
            sx={{
              position: "absolute",
              bottom: 6,
              right: 6,
              backgroundColor: "#7c3aed",
              color: "white",
              "&:hover": {
                backgroundColor: "#6d28d9",
              },
            }}
          >
            <PhotoCameraIcon />
          </IconButton>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </Box>
      </div>

      {/* Profile Sections */}
      <PersonalInfo />
      <MedicalHistory />
      <EmergencyContact />
    </div>
  );
};

export default PatientProfile;
