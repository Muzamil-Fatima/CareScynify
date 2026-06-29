import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Appointment from "./pages/DrAppointment.jsx";
import Patients from "./pages/DrPatients.jsx";
import DrDashboard from "./pages/DrDashboard.jsx";
import DrSchedule from "./pages/DrSchedule.jsx";
import Appointments from "./pages/DrAppointment.jsx";
import AddNewDr from "./pages/AddNewDr.jsx";
import DrReview from "./pages/DrReview.jsx";
import TopBar from "./components/TopBar";
import SideBar from "./components/sidebar/SideBar";
import { Toaster } from "react-hot-toast";
import SettingsLayout from "./components/settings/SettingsLayout.jsx";
import ProfileInfo from "./components/settings/doctor/PersonalInfo";
import Verification from "./components/settings/doctor/Verification";
import ClinicInfo from "./components/settings/doctor/ClinicInfo";
import Credentials from "./components/settings/doctor/Credentials";
import Security from "./components/settings/doctor/Security";
import Notifications from "./components/settings/doctor/Notifications";
import WorkPlaceSchedule from "./components/workPlace/WorkPlaceSchedule.jsx";
// pharmacy route
import PharmacyDashboard from "./pages/PharmacyDashboard.jsx";
import PharmacyMedicines from "./pages/PharmacyMedicines.jsx";
import PharmacyReports from "./pages/PharmacyReports.jsx";
import PharmacySales from "./pages/PharmacySales.jsx";
import PharmacyStock from "./pages/PharmacyStock.jsx";
// Lab route 
import LabDashboard from "./pages/LabDashboard.jsx";
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("");
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith("/settings");

  return (
    <div
      className={
        isSettingsPage
          ? "block w-full min-h-screen bg-[#f8fafc]"
          : "grid grid-cols-[auto_1fr] min-h-screen"
      }
    >
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      {!isSettingsPage && (
        <SideBar
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <div className="flex flex-col h-screen">
        {!isSettingsPage && <TopBar />}
        <div
          className={
            isSettingsPage
              ? "h-screen bg-[#f8fafc] w-full"
              : "p-6 bg-gray-100 flex-1 overflow-y-auto"
          }
        >
          <Routes>
            <Route path="/appointment" element={<Appointment />} />
            {/* Doctor  */}

            <Route
              path="/doctor-dashboard"
              element={
                  <DrDashboard />
              }
            />
            <Route path="/doctor/schedule" element={<DrSchedule />} />
            <Route path="/doctor/appointments" element={<Appointment />} />
            <Route path="/doctor/profile" element={<AddNewDr />} />
            <Route path="/doctor/reviews" element={<DrReview />} />
            <Route path="/workplace/schedule" element={<WorkPlaceSchedule />} />
            <Route path="/patients" element={<Patients />} />
            {/* setting */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route path="personal" element={<ProfileInfo />} />
              <Route path="verification" element={<Verification />} />
              <Route path="security" element={<Security />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="clinic" element={<ClinicInfo />} />
              <Route path="credentials" element={<Credentials />} />
            </Route>
            {/* pharmacy */}
            <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
            <Route
              path=" /pharmacy/medicines"
              element={<PharmacyMedicines />}
            />
            <Route path="/pharmacy/stock" element={<PharmacyStock />} />
            <Route path="/pharmacy/sales" element={<PharmacySales />} />
            <Route path="/pharmacy/reports" element={<PharmacyReports />} />
            {/* Lab  */}
            <Route path="/lab/dashboard" element={<LabDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
