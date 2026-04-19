import React, { useRef, useState } from "react";

import { Avatar, IconButton, Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import MedicalHistory from "./MedicalHistory";
import EmergencyContact from "./EmergencyContact";
import PersonalInfo from "./PersonalInfo";

const PatientProfile = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Open file picker
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Profile Image (MUI) */}
      <div className="flex justify-center">
        <Box position="relative" display="inline-block">

          {/* Avatar */}
          <Avatar
            src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
            sx={{
              width: 140,
              height: 140,
              bgcolor: "#e5e7eb",
              fontSize: 40,
              boxShadow: 3,
            }}
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