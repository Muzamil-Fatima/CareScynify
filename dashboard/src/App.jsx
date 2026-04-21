import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Overview from "./pages/overView/OverView";
import Appointment from "./pages/appointments/Appointment";
import Doctor from "./pages/doctor/Doctor";
import HelpCenter from "./pages/helpCenter/HelpCenter";
import Laboratory from "./pages/laboratory/Laboratory";
import Pharmacy from "./pages/pharmacy/Pharmacy";
import Patients from "./pages/patients/Patients";
import Settings from "./pages/setting/Settings";
import Receptionists from "./pages/receptionists/Receptionists";
import Chat from "./pages/chat/Chat";
import Inventory from "./pages/inventory/Inventory";
import Billing from "./pages/billing/Billing";
import Payments from "./pages/payments/Payments";
import Login from "./pages/auth/Login";
import DrDashboard from "./pages/doctor/DrDashboard";
import DrSchedule from "./pages/doctor/DrSchedule";
import AllAppointment from "./pages/appointments/AllAppointment";
import AddNewDr from "./pages/doctor/AddNewDr";
import DrReview from "./pages/doctor/DrReview";
import ProfileSetting from "./pages/setting/ProfileSetting";
import SecuritySetting from "./pages/setting/SecuritySetting";
import NotificationSetting from "./pages/setting/NotificationSetting";
import TopBar from "./components/TopBar";
import SideBar from "./components/sidebar/SideBar";
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("");
  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen">
      <SideBar
        activeSidebar={activeSidebar}
        setActiveSidebar={setActiveSidebar}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex flex-col h-screen">
        <TopBar className="" />
        <div className=" p-6 bg-gray-100 overflow-auto flex-1">
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/appointment" element={<Appointment />} />
            {/* Doctor  */}
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/doctor/dashboard" element={<DrDashboard />} />
            <Route path="/doctor/schedule" element={<DrSchedule />} />
            <Route path="/doctor/appointments" element={<AllAppointment />} />
            <Route path="/doctor/profile" element={<AddNewDr />} />
            <Route path="/doctor/reviews" element={<DrReview />} />

            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/receptionists" element={<Receptionists />} />
            {/* setting */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<ProfileSetting />} />
            <Route path="/settings/security" element={<SecuritySetting />} />
            <Route
              path="/settings/notifications"
              element={<NotificationSetting />}
            />

            <Route path="/chat" element={<Chat />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
