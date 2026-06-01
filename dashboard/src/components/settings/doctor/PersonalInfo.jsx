import React from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Education from "./Education";
import Professional from "./Professional";
import Languages from "./Languages";
import Experience from "./Experience";
import DrPersonalInfo from "../../../pages/doctor/Personalinformation/DrPersonalInfo";
const PersonalInfo = () => {
  return (
    <form className="space-y-6 w-full min-w-0">
      <div>
        <DrPersonalInfo />
      </div>

      {/* SUB MODULES */}
      <Education />
      <Professional />
      <Languages />
      <Experience />

      {/* SAVE BUTTON (optional if auto-save later) */}
      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl"
        >
          <SaveOutlinedIcon fontSize="small" />
          Save
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
