import React from "react";
import PersonalInfoTab from "../../components/settings/doctor/PersonalInfo";
import EducationTab from "../../components/settings/doctor/Education";
import ProfessionalTab from "../../components/settings/doctor/Professional";
import LanguagesTab from "../../components/settings/doctor/Languages";
import Experience from "../../components/settings/doctor/Experience";

// reusable wrapper style
const SectionWrapper = ({ children }) => {
  return (
    <div className="bg-white rounded-[30px] p-6 shadow-sm border border-slate-200">
      {children}
    </div>
  );
};

const ProfileInfo = () => {
  return (
    <div className="space-y-6">
      <SectionWrapper>
        <PersonalInfoTab />
      </SectionWrapper>

      <SectionWrapper>
        <EducationTab />
      </SectionWrapper>

      <SectionWrapper>
        <ProfessionalTab />
      </SectionWrapper>

      <SectionWrapper>
        <LanguagesTab />
      </SectionWrapper>

      <SectionWrapper>
        <Experience />
      </SectionWrapper>
    </div>
  );
};

export default ProfileInfo;