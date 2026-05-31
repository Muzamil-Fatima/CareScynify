import { useRef, useEffect, useState } from "react";
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
      experience: "",
      education: [],
      workplaces: [],
      languages: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [conflicts, setConflicts] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const profileRef = useRef(profile);
  const saveProfileRef = useRef(null);
  const workplace = useDoctorWorkplace(profile, setProfile);
  const consultationHours = useConsultationHours(
    profileRef,
    setProfile,
    setIsDirty,
    setConflicts,
  );
  const requestIdRef = useRef(0);
  // keep latest profile in ref
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);
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

  // SAVE PROFILE (stable ref-based function)
  useEffect(() => {
    saveProfileRef.current = async () => {
      const requestId = ++requestIdRef.current;

      try {
        setIsSaving(true);

        const currentProfile = profileRef.current;

        const payload = {
          ...currentProfile.user,
          ...currentProfile.doctor,
        };

        const res = await updateDoctorProfile(payload);

        // ignore old responses
        if (requestId !== requestIdRef.current) return;

        if (res?.success) {
          setIsDirty(false);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Profile update failed");
      } finally {
        setIsSaving(false);
      }
    };
  }, []);

  // AUTO SAVE
  useEffect(() => {
    if (!isDirty || loading) return;

    const timer = setTimeout(() => {
      if (!saveProfileRef.current) return;
      saveProfileRef.current();
    }, 800);

    return () => clearTimeout(timer);
  }, [isDirty, loading]);

  // WORKPLACE SETTINGS SAVE
  const saveWorkplaceSettings = async (workplaceId, settings) => {
    try {
      const res = await updateWorkplaceSettings(workplaceId, {
        settings,
      });

      if (res?.success) {
        setProfile((prev) => {
          const updatedWorkplaces = (prev.doctor?.workplaces || []).map((w) =>
            w._id === workplaceId ? { ...w, ...(res.workplace || {}) } : w,
          );

          return {
            ...prev,
            doctor: {
              ...prev.doctor,
              workplaces: updatedWorkplaces,
            },
          };
        });

        setIsDirty(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Workplace save failed");
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
        saveProfile: () => saveProfileRef.current?.(),
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
