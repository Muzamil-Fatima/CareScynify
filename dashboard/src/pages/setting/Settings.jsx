// import { Outlet } from "react-router-dom";
// import SettingWrapper from "./SettingWrapper";
// import profile from "../../../Icons/profile.svg";
// import arrow from "../../../Icons/arrow-up.svg";
// import team from "../../../Icons/team.svg";
const Settings=()=> {
  return (
    <div>
      <h6 className="font-secondary font-bold text-[40px] mt-4">Settings</h6>
      <div className="flex m-4">
        <SettingWrapper
          // icon={profile}
          title="Profile"
          description="Manage your profile and contact details"
          // icon1={arrow}
          navigateTo="/setting/profile-details"
        />
        <SettingWrapper
          // icon={team}
          title="Team"
          description="Manage your team roles and their contact details"
          // icon1={arrow}
          navigateTo="/setting/team-details"
        />
      </div>
    </div>
  );
}
export default Settings;