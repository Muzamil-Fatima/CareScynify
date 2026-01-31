import React from "react";
import DrSideBar from "../pages/doctor/DrSideBar";
import LabSideBar from "../pages/laboratory/LabSideBar";
import AppointmentSideBar from "../pages/appointments/AppointmentSideBar";
import InventorySideBar from "../pages/inventory/InventorySideBar";
import AdminSideBar from "../pages/admin/AdminSideBar";
import Billing from "../pages/billing/Billing";
import PaymentSideBar from "../pages/payments/PaymentSideBar";

const ToggleSideBar = () => {
  return (
    <div>
      <DrSideBar />
      <LabSideBar />
      <AppointmentSideBar/>
      <InventorySideBar/>
      <AdminSideBar />
      <Billing />
      <PaymentSideBar />
    </div>
  );
};

export default ToggleSideBar;
