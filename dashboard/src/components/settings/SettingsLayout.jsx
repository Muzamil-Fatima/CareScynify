import { Outlet } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import { useState } from "react";

const SettingsLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <SettingsSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* PAGE AREA */}
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default SettingsLayout;