import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import LabProfileContext from "./LabProfileContext";

import {
  getLabProfile,
  updateLabProfile,
} from "../../api/laboratory/labProfileApi";

const LabProfileProvider = ({ children }) => {
  const [dirty, setIsDirty] = useState(false);

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    user: {},
    laboratory: {},
  });

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data = await getLabProfile();

        setProfile({
          user: data.user || {},
          laboratory: data.laboratory || {},
        });
      } catch (err) {
        console.error("Fetch Laboratory Profile Error:", err);

        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Auto Save
  useEffect(() => {
    if (!dirty) return;

    const timeout = setTimeout(async () => {
      try {
        const payload = {
          // ================= USER =================

          name: profile.user?.name,

          email: profile.user?.email,

          phone: profile.user?.phone,

          dob: profile.user?.dob,

          cnic: profile.user?.cnic,

          // ================= LABORATORY =================

          ...profile.laboratory,

          // ================= AVATAR =================

          avatar: profile.user?.avatar,
        };

        // Remove empty values

        Object.keys(payload).forEach((key) => {
          if (
            payload[key] === "" ||
            payload[key] === null ||
            payload[key] === undefined
          ) {
            delete payload[key];
          }
        });

        await updateLabProfile(payload);

        setIsDirty(false);

        toast.success("Profile saved successfully");
      } catch (err) {
        console.error("Auto Save Error:", err);

        toast.error("Failed to save profile");
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [profile.user, profile.laboratory, dirty]);

  return (
    <LabProfileContext.Provider
      value={{
        profile,

        setProfile,

        loading,

        user: profile.user,

        laboratory: profile.laboratory,

        setIsDirty,
      }}
    >
      {children}
    </LabProfileContext.Provider>
  );
};

export default LabProfileProvider;
