import DrSideBar from "../../pages/doctor/DrSideBar";
import LabSideBar from "../../pages/laboratory/LabSideBar";
import AppointmentSideBar from "../../pages/appointments/AppointmentSideBar";
import SideBar from "./SideBar";
import SettingSideBar from "../../pages/setting/SettingSideBar";

const ToggleSideBar = ({
  activeSidebar,
  setActiveSidebar,
  isOpen,
  setIsOpen,
}) => {
  if (activeSidebar === "dr")
    return <DrSideBar isOpen={isOpen} setIsOpen={setIsOpen} />;

  if (activeSidebar === "lab")
    return <LabSideBar isOpen={isOpen} setIsOpen={setIsOpen} />;

  if (activeSidebar === "appointment")
    return <AppointmentSideBar isOpen={isOpen} setIsOpen={setIsOpen} />;
  if (activeSidebar === "settings")
    return <SettingSideBar isOpen={isOpen} setIsOpen={setIsOpen} />;
  // default → main sidebar
  return (
    <SideBar
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setActiveSidebar={setActiveSidebar}
    />
  );
};
export default ToggleSideBar;
