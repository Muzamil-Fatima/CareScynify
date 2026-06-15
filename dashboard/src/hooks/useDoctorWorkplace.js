import {
  addDoctorWorkplace,
  updateDoctorWorkplace,
  deleteDoctorWorkplace,
} from "../api/doctorApi";

import { toast } from "react-hot-toast";

export const useDoctorWorkplace = (profile, setProfile) => {

  // ADD
  const addWorkplace = async (data) => {
    try {
      const res = await addDoctorWorkplace(data);

      if (res?.success) {
        setProfile((prev) => ({
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: res.workplaces,
          },
        }));

        toast.success("Workplace added");
        return true;
      }

      toast.error(res?.message || "Failed to add workplace");
      return false;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
      return false;
    }
  };

  // UPDATE (SINGLE SOURCE OF TRUTH)
  const updateWorkplace = async (id, data) => {
    try {
      const res = await updateDoctorWorkplace(id, data);

      if (res?.success) {
        // 🔥 ALWAYS replace from backend (no merging here)
        setProfile((prev) => ({
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: res.workplaces,
          },
        }));

        toast.success("Workplace updated");
        return true;
      }

      toast.error(res?.message || "Failed to update workplace");
      return false;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
      return false;
    }
  };

  // DELETE
  const deleteWorkplace = async (id) => {
    try {
      const res = await deleteDoctorWorkplace(id);

      if (res?.success) {
        setProfile((prev) => ({
          ...prev,
          doctor: {
            ...prev.doctor,
            workplaces: res.workplaces,
          },
        }));

        toast.success("Workplace deleted");
        return true;
      }

      toast.error(res?.message || "Failed to delete workplace");
      return false;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
      return false;
    }
  };

  return {
    addWorkplace,
    updateWorkplace,
    deleteWorkplace,
  };
};