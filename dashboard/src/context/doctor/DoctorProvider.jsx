import { useEffect, useState, useCallback } from "react";
import DoctorContext from "./DoctorContext";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateWorkplaceSettings,
} from "../../api/doctorApi";
import { useDoctorWorkplace } from "../../hooks/useDoctorWorkplace";
import { useConsultationHours } from "../../hooks/useConsultationHours";
import toast from "react-hot-toast";

const DoctorProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    user: {},
    doctor: {
      specialization: "",
      qualifications: "",
      licenseNo: "",
      experience: "", // FIXED STRING
      education: [],
      workplaces: [],
      languages: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [conflicts, setConflicts] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const workplace = useDoctorWorkplace(profile, setProfile);
  const consultationHours = useConsultationHours(setProfile, setIsDirty);

  // FETCH PROFILE
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getDoctorProfile();

        if (!isMounted) return;

        setProfile({
          user: data?.user || {},
          doctor: {
            specialization: data?.doctor?.specialization || "",
            qualifications: data?.doctor?.qualifications || "",
            licenseNo: data?.doctor?.licenseNo || "",
            experience: data?.doctor?.experience || "",

            education: data?.doctor?.education || [],
            workplaces: data?.doctor?.workplaces || [],
            languages: data?.doctor?.languages || [],
          },
        });
      } catch (err) {
        console.error("Doctor fetch error:", err);
        toast.error(err?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // SAVE PROFILE
  const saveProfile = useCallback(async () => {
    try {
      setIsSaving(true);

      const payload = {
        ...profile.user,
        ...profile.doctor,
      };

      console.log("PAYLOAD =>", payload);

      const res = await updateDoctorProfile(payload);

      if (res?.success) {
        setIsDirty(false);
      }
    } catch (err) {
      console.error("Profile update error:", err);

      toast.error(err?.response?.data?.message || "Profile update failed");
    } finally {
      setIsSaving(false);
    }
  }, [profile]);
  const saveWorkplaceSettings = async (workplaceId, settings) => {
    try {
      const res = await updateWorkplaceSettings(workplaceId, { settings });

      if (res?.success) {
        setProfile((prev) => {
          const updated = prev.doctor.workplaces.map((w) =>
            w._id === workplaceId ? res.workplace : w,
          );

          return {
            ...prev,
            doctor: {
              ...prev.doctor,
              workplaces: updated,
            },
          };
        });

        setIsDirty(false);
      }
    } catch (err) {
      console.error("Workplace save error:", err);
    }
  };
  // AUTO SAVE
  useEffect(() => {
    if (!isDirty || loading) return;

    const timer = setTimeout(() => {
      saveProfile();
    }, 800);

    return () => clearTimeout(timer);
  }, [profile, isDirty, loading, saveProfile]);

  return (
    <DoctorContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        isDirty,
        setIsDirty,
        saveProfile,
        workplace,
        consultationHours,
        conflicts,
        setConflicts,
        isSaving,
        saveWorkplaceSettings,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
