import { useEffect, useState } from "react";
import DoctorContext from "./DoctorContext";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateDoctorEducation,
  updateDoctorWorkplaces,
} from "../../api/doctorApi";

import toast from "react-hot-toast";

const DoctorProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    user: {},
    doctor: {},
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
          doctor: data.doctor || {},
        });
      } catch (err) {
        console.error("Doctor fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SAVE PROFILE (BASIC INFO)
  const saveProfile = async () => {
    try {
      const payload = {
        name: profile.user.name,
        email: profile.user.email,
        phone: profile.user.phone,
        address: profile.user.address,
        dob: profile.user.dob,
        cnic: profile.user.cnic,

        specialization: profile.doctor.specialization,
        experience: profile.doctor.experience,
        licenseNo: profile.doctor.licenseNo,
      };

      const res = await updateDoctorProfile(payload);

      if (res?.success) {
        toast.success("Profile updated");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    }
  };

  // =========================
// EDUCATION CRUD
// =========================

// ADD EDUCATION
const addEducation = async (newItem) => {
  try {
    const current = profile?.doctor?.education || [];

    const updated = [
      { id: Date.now(), ...newItem },
      ...current,
    ];

    const res = await updateDoctorEducation({ education: updated });

    if (res?.success) {
      setProfile((prev) => ({
        ...prev,
        doctor: {
          ...prev.doctor,
          education: updated,
        },
      }));

      toast.success("Education added");
      return true;
    }

    toast.error(res?.message || "Add failed");
    return false;
  } catch (err) {
    console.error(err);
    toast.error("Add education failed");
    return false;
  }
};

// UPDATE EDUCATION
const updateEducation = async (id, updatedData) => {
  try {
    const current = profile?.doctor?.education || [];

    const updated = current.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );

    const res = await updateDoctorEducation({ education: updated });

    if (res?.success) {
      setProfile((prev) => ({
        ...prev,
        doctor: {
          ...prev.doctor,
          education: updated,
        },
      }));

      toast.success("Education updated");
      return true;
    }

    toast.error(res?.message || "Update failed");
    return false;
  } catch (err) {
    console.error(err);
    toast.error("Update education failed");
    return false;
  }
};

// DELETE EDUCATION
const deleteEducation = async (id) => {
  try {
    const current = profile?.doctor?.education || [];

    const updated = current.filter((item) => item.id !== id);

    const res = await updateDoctorEducation({ education: updated });

    if (res?.success) {
      setProfile((prev) => ({
        ...prev,
        doctor: {
          ...prev.doctor,
          education: updated,
        },
      }));

      toast.success("Education deleted");
      return true;
    }

    toast.error(res?.message || "Delete failed");
    return false;
  } catch (err) {
    console.error(err);
    toast.error("Delete education failed");
    return false;
  }
};

  // SAVE WORKPLACES
  const saveWorkplaces = async (workplaces) => {
    try {
      const res = await updateDoctorWorkplaces({ workplaces });

      if (res?.success) {
        toast.success("Workplaces updated");
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Workplaces update failed");
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        profile,
        setProfile,
        loading,

        // actions
        saveProfile,
        addEducation,
        updateEducation,
        deleteEducation,
        saveWorkplaces,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
