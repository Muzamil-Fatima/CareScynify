
import React, { useRef, useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "react-hot-toast";

import LabPersonalInfo from "../../components/laboratory/Profile/LabPersonalInfo";
import LabContactInfo from "../../components/laboratory/Profile/LabContactInfo";
import LabDetails from "../../components/laboratory/Profile/LabDetails";
import LabServices from "../../components/laboratory/Profile/LabServices";
import LabWorkingHours from "../../components/laboratory/Profile/LabWorkingHours";

import { updateUserProfile } from "../../api/userApi";
import { useLaboratory } from "../../context/laboratory/LaboratoryContext";

const LaboratoryProfile = () => {
  const { profile, setProfile, setIsDirty } = useLaboratory();

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
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl p-8 space-y-8">

        {/* Avatar */}
        <div className="flex justify-center">
          <div
            onClick={handleBrowseClick}
            className="relative group w-40 h-40 rounded-full overflow-hidden cursor-pointer border-2 border-purple-500"
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Laboratory"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-center px-4">
                Click to Upload
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition">
              <PhotoCameraIcon
                sx={{
                  color: "white",
                  fontSize: 34,
                }}
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Sections */}

        <LabPersonalInfo />

        <LabContactInfo />

        <LabDetails />

        <LabServices />

        <LabWorkingHours />
      </div>
    </div>
  );
};

export default LaboratoryProfile;