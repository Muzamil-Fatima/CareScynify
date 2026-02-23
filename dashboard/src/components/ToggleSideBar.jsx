import React, { useState } from "react";
import DrSideBar from "../pages/doctor/DrSideBar";
import LabSideBar from "../pages/laboratory/LabSideBar";
import AppointmentSideBar from "../pages/appointments/AppointmentSideBar";
import InventorySideBar from "../pages/inventory/InventorySideBar";
import AdminSideBar from "../pages/admin/AdminSideBar";
import Billing from "../pages/billing/Billing";
import PaymentSideBar from "../pages/payments/PaymentSideBar";
import SideBar from "./SideBar";

const ToggleSideBar = () => {
  const [activeSidebar, setActiveSidebar] = useState("dr");
  const renderSidebar = () => {
    switch (activeSidebar) {
      case "dr":
        return <DrSideBar />;
      case "lab":
        return <LabSideBar />;
      case "appointment":
        return <AppointmentSideBar />;
      case "inventory":
        return <InventorySideBar />;
      case "admin":
        return <AdminSideBar />;
      case "billing":
        return <Billing />;
      case "payment":
        return <PaymentSideBar />;
      default:
        return <SideBar />;
    }
  };
  return (
    <div className="flex">
      {/* pass setter to your menu so it can update which sidebar is active */}
      <SideBar setActiveSidebar={setActiveSidebar} />
      {/* only render the active sidebar */}
      <div className="flex-1">{renderSidebar()}</div>
    </div>
  );
};

export default ToggleSideBar;
