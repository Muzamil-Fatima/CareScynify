import { updateDoctorExperience } from "../../api/doctorApi";
import { updateDoctorModule } from "../utils/doctorModuleHelper.js";

export const useDoctorExperience = (profile) => {
  // EXPERIENCE CRUD
  const addExperience = (data) => {
    const updated = [{ id: Date.now(), ...data }, ...profile.doctor.experience];

    return updateDoctorModule(
      "experience",
      updateDoctorExperience,
      updated,
      "Experience added",
    );
  };

  const updateExperience = (id, data) => {
    const updated = profile.doctor.experience.map((item) =>
      item.id === id ? { ...item, ...data } : item,
    );

    return updateDoctorModule(
      "experience",
      updateDoctorExperience,
      updated,
      "Experience updated",
    );
  };

  const deleteExperience = (id) => {
    const updated = profile.doctor.experience.filter((i) => i.id !== id);

    return updateDoctorModule(
      "experience",
      updateDoctorExperience,
      updated,
      "Experience deleted",
    );
  };
  return {
    addExperience,
    updateExperience,
    deleteExperience,
  };
};
