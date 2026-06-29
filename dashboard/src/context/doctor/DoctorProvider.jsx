import { useRef, useEffect, useState } from "react";
import DoctorContext from "./DoctorContext";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateWorkplaceSettings,
  addDoctorEducation,
  updateDoctorEducation,
  deleteDoctorEducation,
  addDoctorExperience,
  updateDoctorExperience,
  deleteDoctorExperience,
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
  const [activeWorkplaceId, setActiveWorkplaceId] = useState("all");
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
            experiences: data?.doctor?.experienceDetails || [],
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
  // education
  const addEducation = async (data) => {
    const res = await addDoctorEducation(data);

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        education: res.education,
      },
    }));
  };
  const updateEducation = async (id, data) => {
    const res = await updateDoctorEducation(id, data);

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        education: res.education,
      },
    }));
  };

  const removeEducation = async (id) => {
    const res = await deleteDoctorEducation(id);

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        education: res.education,
      },
    }));
  };
  const addExperience = async (data) => {
    const res = await addDoctorExperience(data);

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        experiences: res.experience, // backend should return updated list
      },
    }));
  };

  const updateExperience = async (id, data) => {
    const res = await updateDoctorExperience(id, data);

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        experiences: res.experience,
      },
    }));
  };

  const removeExperience = async (id) => {
    const res = await deleteDoctorExperience(id);

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        experiences: res.experience,
      },
    }));
  };
  const uploadVerificationDocuments = async (cnicFront, cnicBack) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (cnicFront) {
        formData.append("cnicFront", cnicFront);
      }

      if (cnicBack) {
        formData.append("cnicBack", cnicBack);
      }

      const res = await updateDoctorProfile(formData);

      if (res?.doctor) {
        setProfile((prev) => ({
          ...prev,
          doctor: {
            ...prev.doctor,
            identityVerification: res.doctor.identityVerification,
          },
        }));
      }

      toast.success(res?.message || "Documents uploaded successfully");

      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload documents");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DoctorContext.Provider
      value={{
        profile,
        setProfile,
        activeWorkplaceId,
        setActiveWorkplaceId,
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
        addEducation,
        updateEducation,
        removeEducation,
        removeExperience,
        updateExperience,
        addExperience,
        uploadVerificationDocuments,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
