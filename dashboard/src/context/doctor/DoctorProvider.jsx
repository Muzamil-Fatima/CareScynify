import { useEffect, useState } from "react";
import DoctorContext from "./DoctorContext";
import { getDoctorProfile, updateDoctorProfile } from "../../api/doctorApi";

import toast from "react-hot-toast";

const DoctorProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    user: {},
    doctor: {
      education: [],
      workplaces: [],
      languages: [],
      experience: [],
    },
  });

  const [loading, setLoading] = useState(true);

  // FETCH PROFILE
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDoctorProfile();

        setProfile({
          user: data.user || {},
          doctor: {
            education: data.doctor?.education || [],
            workplaces: data.doctor?.workplaces || [],
            languages: data.doctor?.languages || [],
            experience: data.doctor?.experience || [],
          },
        });
      } catch (err) {
        console.error("Doctor fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // PROFILE UPDATE
  const saveProfile = async () => {
    try {
      const payload = {
        ...profile.user,
        ...profile.doctor,
      };

      const res = await updateDoctorProfile(payload);

      if (res?.success) toast.success("Profile updated");
      else toast.error(res?.message || "Update failed");
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Profile update failed");
    }
  };

 

  return (
    <DoctorContext.Provider
      value={{
        profile,
        setProfile,
        loading,

        saveProfile,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
