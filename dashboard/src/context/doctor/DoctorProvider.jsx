import { useEffect, useState } from "react";
import DoctorContext from "./DoctorContext";
import { getDoctorProfile, updateDoctorProfile } from "../../api/doctorApi";
import { useDoctorWorkplace } from "../../hooks/useDoctorWorkplace";
import { useConsultationHours } from "../../hooks/useConsultationHours";
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
  const [isDirty, setIsDirty] = useState(false);
  const [conflicts, setConflicts] = useState({});
  //  WORKPLACE HOOK
  const workplace = useDoctorWorkplace(profile, setProfile);

  //  CONSULTATION HOURS HOOK
  const consultationHours = useConsultationHours(setProfile, setIsDirty);

  //  FETCH PROFILE
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

        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---------------- SAVE PROFILE ----------------
  const saveProfile = async () => {
    try {
      const payload = {
        ...profile.user,
        ...profile.doctor,
      };

      const res = await updateDoctorProfile(payload);

      if (res?.success) {
        toast.success("Profile updated");

        setIsDirty(false);
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      console.error("Profile update error:", err);

      toast.error(err?.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        profile,
        setProfile,

        loading,

        isDirty,
        setIsDirty,

        saveProfile,

        // workplace management
        workplace,

        // consultation hours
        consultationHours,
        // timing per day 
        conflicts,
        setConflicts,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
