import { updateDoctorEducation } from "../../api/doctorApi";
import { updateDoctorModule } from "../utils/doctorModuleHelper.js";

export const useDoctorEducation = (profile) => {
  // EDUCATION CRUD
  const addEducation = (data) => {
    const updated = [{ id: Date.now(), ...data }, ...profile.doctor.education];

    return updateDoctorModule(
      "education",
      updateDoctorEducation,
      updated,
      "Education added",
    );
  };

  const updateEducation = (id, data) => {
    const updated = profile.doctor.education.map((item) =>
      item.id === id ? { ...item, ...data } : item,
    );

    return updateDoctorModule(
      "education",
      updateDoctorEducation,
      updated,
      "Education updated",
    );
  };

  const deleteEducation = (id) => {
    const updated = profile.doctor.education.filter((i) => i.id !== id);

    return updateDoctorModule(
      "education",
      updateDoctorEducation,
      updated,
      "Education deleted",
    );
  };
  return {
    // education
    addEducation,
    updateEducation,
    deleteEducation,
  };
};
