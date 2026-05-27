import { updateDoctorLanguages } from "../../api/doctorApi";
import { updateDoctorModule } from "../utils/doctorModuleHelper.js";


export const useDoctorLanguage = (profile) => {
  // LANGUAGES CRUD
  const addLanguage = (data) => {
    const updated = [{ id: Date.now(), ...data }, ...profile.doctor.languages];

    return updateDoctorModule(
      "languages",
      updateDoctorLanguages,
      updated,
      "Language added",
    );
  };

  const updateLanguage = (id, data) => {
    const updated = profile.doctor.languages.map((item) =>
      item.id === id ? { ...item, ...data } : item,
    );

    return updateDoctorModule(
      "languages",
      updateDoctorLanguages,
      updated,
      "Language updated",
    );
  };

  const deleteLanguage = (id) => {
    const updated = profile.doctor.languages.filter((i) => i.id !== id);

    return updateDoctorModule(
      "languages",
      updateDoctorLanguages,
      updated,
      "Language deleted",
    );
  };
  return {
    // language
    addLanguage,
    updateLanguage,
    deleteLanguage,
  };
};
