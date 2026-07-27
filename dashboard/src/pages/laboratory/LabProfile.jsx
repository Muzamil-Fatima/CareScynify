import React, { useRef, useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "react-hot-toast";

import LabPersonalInfo from "../../components/laboratory/profile/LabPersonalInfo";
import LabContactInfo from "../../components/laboratory/profile/LabContactInfo";
import LabDetails from "../../components/laboratory/profile/LabDetails";
import LabServices from "../../components/laboratory/profile/LabServices";
import LabWorkingHours from "../../components/laboratory/profile/LabWorkingHours";

import { updateUserProfile } from "../../api/userApi";
import { useLabProfile } from "../../context/laboratory/LabProfileContext";

const LaboratoryProfile = () => {
  const { profile, setProfile, setIsDirty } = useLabProfile();

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

      toast.success("Profile image updated.");
    } catch (err) {
      console.error(err);

      toast.error("Image upload failed.");
    }
  };

  const avatar = selectedFile
    ? URL.createObjectURL(selectedFile)
    : profile?.user?.avatar?.url || "";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl p-8 space-y-8">
        {/* Avatar */}

        <div className="flex justify-center">
          <div
            onClick={handleBrowseClick}
            className="relative group w-40 h-40 rounded-full overflow-hidden cursor-pointer border-2 border-purple-500"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Laboratory"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-center">
                Click to Upload
              </div>
            )}

            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40">
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
