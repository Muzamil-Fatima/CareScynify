import { Route, Routes } from "react-router-dom";
import ToggleSideBar from "./components/sidebar/ToggleSideBar";
import Overview from "./pages/overView/OverView";
import Appointment from "./pages/appointments/Appointment";
import Doctor from "./pages/doctor/Doctor";
import HelpCenter from "./pages/helpCenter/HelpCenter";
import Laboratory from "./pages/laboratory/Laboratory";
import Patients from "./pages/patients/Patients";
import Settings from "./pages/setting/Settings";
import SideIcon from "./components/SideIcon";
import Receptionists from "./pages/receptionists/Receptionists";
import Chat from "./pages/chat/Chat";
import Inventory from "./pages/inventory/Inventory";
import Billing from "./pages/billing/Billing";
import Payments from "./pages/payments/Payments";
import Login from "./pages/auth/Login";
import { useState } from "react";
import DrDashboard from "./pages/doctor/DrDashboard";
import DrSchedule from "./pages/doctor/DrSchedule";
import AllAppointment from "./pages/appointments/AllAppointment";
import AddNewDr from "./pages/doctor/AddNewDr";
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("");
  return (
    <div className="grid  grid-cols-[auto_1fr] min-h-screen">
      <ToggleSideBar
        activeSidebar={activeSidebar}
        setActiveSidebar={setActiveSidebar}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* <SideBar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <div className=" p-6 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/appointment" element={<Appointment />} />
          {/* Doctor  */}
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctor/dashboard" element={<DrDashboard />} />
          <Route path="/doctor/schedule" element={<DrSchedule />} />
          <Route path="/doctor/appointments" element={<AllAppointment />} />
          <Route path="/doctor/profile" element={<AddNewDr />} />

          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/receptionists" element={<Receptionists />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <SideIcon />
    </div>
  );
}

export default App;
