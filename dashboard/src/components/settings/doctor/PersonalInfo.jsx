import React from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import Education from "./Education";
// import Professional from "./Professional";
import Languages from "./Languages";
import Experience from "./Experience";
import DrPersonalInfo from "../../../pages/doctor/Personalinformation/DrPersonalInfo";

import SectionCard from "../SectionCard";

const PersonalInfo = () => {
  return (
    <div className="space-y-6 w-full">
      <SectionCard>
        <DrPersonalInfo />
      </SectionCard>

      <SectionCard>
        <Education />
      </SectionCard>

      <SectionCard>
        <Experience />
      </SectionCard>
      
      <SectionCard>
        <Languages />
      </SectionCard>
    </div>
  );
};

export default PersonalInfo;
