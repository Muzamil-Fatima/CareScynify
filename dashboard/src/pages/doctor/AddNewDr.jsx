import React, { useRef, useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "react-hot-toast";

import DrPersonalInfo from "../../components/drProfile/DrPersonalInfo";
import DrProfessionalDetail from "../../components/drProfile/DrProfessionalDetail";
import TotalWorkPlaces from "../../components/workPlace/TotalWorkPlaces";

import { updateUserProfile } from "../../api/userApi";
import { useDoctor } from "../../context/doctor/DoctorContext";

const AddNewDr = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await updateUserProfile(formData);

      // update only user avatar locally
      setProfile((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          avatar: res.user.avatar,
        },
      }));

      setIsDirty(true);
      toast.success("Profile image updated");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const avatarSrc = selectedFile
    ? URL.createObjectURL(selectedFile)
    : profile?.user?.avatar || "";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-8 space-y-8">
        {/* AVATAR */}
        <div className="flex justify-center">
          <div
            onClick={handleBrowseClick}
            className="relative group w-40 h-40 rounded-full overflow-hidden cursor-pointer border-2 border-purple-400"
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-center">
                Click to Upload
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center">
              <PhotoCameraIcon style={{ color: "white", fontSize: 32 }} />
            </div>

            {/* Hidden input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* SECTIONS */}
        <DrPersonalInfo />
        <DrProfessionalDetail />
        <TotalWorkPlaces />
      </div>
    </div>
  );
};

export default AddNewDr;
