import { useEffect, useState } from "react";
import DoctorContext from "./DoctorContext";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateDoctorEducation,
  updateDoctorWorkplaces,
  updateDoctorLanguages,
  updateDoctorExperience,
} from "../../api/doctorApi";

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

  // GENERIC HELPER
  const updateModule = async (key, apiCall, updatedArray, successMsg) => {
    try {
      const res = await apiCall({ [key]: updatedArray });

      if (res?.success) {
        setProfile((prev) => ({
          ...prev,
          doctor: {
            ...prev.doctor,
            [key]: updatedArray,
          },
        }));

        toast.success(successMsg);
        return true;
      }

      toast.error(res?.message || "Operation failed");
      return false;
    } catch (err) {
      console.error("Module update error:", err);
      toast.error("Server error");
      return false;
    }
  };

  // EDUCATION CRUD
  const addEducation = (data) => {
    const updated = [
      { id: Date.now(), ...data },
      ...profile.doctor.education,
    ];

    return updateModule(
      "education",
      updateDoctorEducation,
      updated,
      "Education added"
    );
  };

  const updateEducation = (id, data) => {
    const updated = profile.doctor.education.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );

    return updateModule(
      "education",
      updateDoctorEducation,
      updated,
      "Education updated"
    );
  };

  const deleteEducation = (id) => {
    const updated = profile.doctor.education.filter((i) => i.id !== id);

    return updateModule(
      "education",
      updateDoctorEducation,
      updated,
      "Education deleted"
    );
  };

  // WORKPLACES CRUD
  const addWorkplace = (data) => {
    const updated = [
      { id: Date.now(), ...data },
      ...profile.doctor.workplaces,
    ];

    return updateModule(
      "workplaces",
      updateDoctorWorkplaces,
      updated,
      "Workplace added"
    );
  };

  const updateWorkplace = (id, data) => {
    const updated = profile.doctor.workplaces.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );

    return updateModule(
      "workplaces",
      updateDoctorWorkplaces,
      updated,
      "Workplace updated"
    );
  };

  const deleteWorkplace = (id) => {
    const updated = profile.doctor.workplaces.filter((i) => i.id !== id);

    return updateModule(
      "workplaces",
      updateDoctorWorkplaces,
      updated,
      "Workplace deleted"
    );
  };

  // LANGUAGES CRUD
  const addLanguage = (data) => {
    const updated = [
      { id: Date.now(), ...data },
      ...profile.doctor.languages,
    ];

    return updateModule(
      "languages",
      updateDoctorLanguages,
      updated,
      "Language added"
    );
  };

  const updateLanguage = (id, data) => {
    const updated = profile.doctor.languages.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );

    return updateModule(
      "languages",
      updateDoctorLanguages,
      updated,
      "Language updated"
    );
  };

  const deleteLanguage = (id) => {
    const updated = profile.doctor.languages.filter((i) => i.id !== id);

    return updateModule(
      "languages",
      updateDoctorLanguages,
      updated,
      "Language deleted"
    );
  };

  // =========================
  // EXPERIENCE CRUD
  // =========================
  const addExperience = (data) => {
    const updated = [
      { id: Date.now(), ...data },
      ...profile.doctor.experience,
    ];

    return updateModule(
      "experience",
      updateDoctorExperience,
      updated,
      "Experience added"
    );
  };

  const updateExperience = (id, data) => {
    const updated = profile.doctor.experience.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );

    return updateModule(
      "experience",
      updateDoctorExperience,
      updated,
      "Experience updated"
    );
  };

  const deleteExperience = (id) => {
    const updated = profile.doctor.experience.filter((i) => i.id !== id);

    return updateModule(
      "experience",
      updateDoctorExperience,
      updated,
      "Experience deleted"
    );
  };

  return (
    <DoctorContext.Provider
      value={{
        profile,
        setProfile,
        loading,

        saveProfile,

        // education
        addEducation,
        updateEducation,
        deleteEducation,

        // workplace
        addWorkplace,
        updateWorkplace,
        deleteWorkplace,

        // language
        addLanguage,
        updateLanguage,
        deleteLanguage,

        // experience
        addExperience,
        updateExperience,
        deleteExperience,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;