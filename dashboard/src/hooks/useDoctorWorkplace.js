import { updateWorkplaceSchedule, updateWorkplaces } from "../../api/doctorApi";
import { updateDoctorModule } from "../utils/doctorModuleHelper.js";
import { toast } from "react-hot-toast";
export const useDoctorWorkplace = (profile) => {
  // WORKPLACES CRUD
  const addWorkplace = (data) => {
    const updated = [
      {
        ...data,
        availability: [],
        settings: {
          appointmentDuration: {
            value: 30,
            unit: "minutes",
          },
        },
      },
      ...profile.doctor.workplaces,
    ];

    return updateDoctorModule(
      "workplaces",
      updateWorkplaces,
      updated,
      "Workplace added",
    );
  };

  const updateWorkplace = (id, data) => {
    const updated = profile.doctor.workplaces.map((item) =>
      item._id === id ? { ...item, ...data } : item,
    );

    return updateDoctorModule(
      "workplaces",
      updateWorkplaces,
      updated,
      "Workplace updated",
    );
  };

  const deleteWorkplace = (id) => {
    const updated = profile.doctor.workplaces.filter((i) => i._id !== id);

    return updateDoctorModule(
      "workplaces",
      updateWorkplaces,
      updated,
      "Workplace deleted",
    );
  };
  const saveWorkplaceSettings = async (workplaceId, settings) => {
    try {
      const res = await updateWorkplaceSchedule(workplaceId, {
        settings, // MUST match backend
      });

      if (res?.success) {
        toast.success("Saved successfully");
        return true;
      }

      toast.error(res?.message || "Save failed");
      return false;
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Server error");
      return false;
    }
  };
  return {
    // workplace
    saveWorkplaceSettings,
    addWorkplace,
    updateWorkplace,
    deleteWorkplace,
  };
};
