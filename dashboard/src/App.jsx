import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Appointment from "./pages/doctor/DrAppointment.jsx";
import Patients from "./pages/doctor/DrPatients.jsx";
import DrDashboard from "./pages/doctor/DrDashboard.jsx";
import DrSchedule from "./pages/doctor/DrSchedule.jsx";
import Appointments from "./pages/doctor/DrAppointment.jsx";
import AddNewDr from "./pages/doctor/AddNewDr.jsx";
import DrReview from "./pages/doctor/DrReview.jsx";
import TopBar from "./components/TopBar";
import SideBar from "./components/sidebar/SideBar";
import { Toaster } from "react-hot-toast";
import SettingsLayout from "./components/settings/SettingsLayout.jsx";
import ProfileInfo from "./components/settings/doctor/PersonalInfo";
import Verification from "./components/settings/doctor/Verification";
import Credentials from "./components/settings/doctor/Credentials";
import Security from "./components/settings/doctor/Security";
import Notifications from "./components/settings/doctor/Notifications";
import WorkPlaceSchedule from "./components/workPlace/WorkPlaceSchedule.jsx";
// pharmacy route
import PharmacyDashboard from "./pages/pharmacy/Dashboard.jsx";
import PharmacyMedicines from "./pages/pharmacy/Medicines.jsx";
import PharmacyReports from "./pages/pharmacy/Reports.jsx";
import PharmacySales from "./pages/pharmacy/Sales.jsx";
import PharmacyStock from "./pages/pharmacy/Stock.jsx";
// Lab route
import LabDashboard from "./pages/lab/Dashboard.jsx";
import LabTestProcess from "./pages/lab/LabTestProcess.jsx";
import LabSampleQueue from "./pages/lab/LabSampleQueue.jsx";
import LabPatients from "./pages/lab/LabPatients.jsx";
import LabTests from "./pages/lab/Tests.jsx";
import PatientProfile from "./pages/doctor/PatientProfile.jsx";
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

            <Route path="/doctor/dashboard" element={<DrDashboard />} />
            <Route path="/doctor/schedule" element={<DrSchedule />} />
            <Route path="/doctor/appointments" element={<Appointment />} />
            <Route path="/doctor/profile" element={<AddNewDr />} />
            <Route path="/doctor/reviews" element={<DrReview />} />
            <Route path="/workplace/schedule" element={<WorkPlaceSchedule />} />
            <Route path="/patients" element={<Patients />} />
            <Route
              path="/doctor/patient/profile/:patientId"
              element={<PatientProfile />}
            />
            {/* setting */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route path="personal" element={<ProfileInfo />} />
              <Route path="verification" element={<Verification />} />
              <Route path="security" element={<Security />} />
              <Route path="notifications" element={<Notifications />} />
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
            <Route path="/lab/processing" element={<LabTestProcess />} />
            <Route path="/lab/samples" element={<LabSampleQueue />} />
            <Route path="/lab/patients" element={<LabPatients />} />
            <Route path="/lab/tests" element={<LabTests />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
