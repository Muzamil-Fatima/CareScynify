import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PharmacyContext from "./PharmacyContext";
import {
  getPharmacyProfile,
  updatePharmacyProfile,
} from "../../api/pharmacy/profileApi";;

const PharmacyProvider = ({ children }) => {
  const [dirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    user: {},
    pharmacy: {},
  });

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data = await getPharmacyProfile();

        setProfile({
          user: data.user || {},
          pharmacy: data.pharmacy || {},
        });
      } catch (err) {
        console.error("Fetch Pharmacy Profile Error:", err);
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

          // ================= PHARMACY =================
          ...profile.pharmacy,
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

        // console.log("Saving Pharmacy Profile:", payload);

        await updatePharmacyProfile(payload);

        setIsDirty(false);

        toast.success("Profile saved successfully");
      } catch (err) {
        console.error("Auto Save Error:", err);

        toast.error("Failed to save profile");
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [profile.user, profile.pharmacy, dirty]);

  return (
    <PharmacyContext.Provider
      value={{
        profile,
        setProfile,

        loading,

        user: profile.user,
        pharmacy: profile.pharmacy,

        setIsDirty,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

export default PharmacyProvider;