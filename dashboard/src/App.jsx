import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Appointment from "./pages/doctor/DrAppointment.jsx";
import Patients from "./pages/doctor/DrPatients.jsx";
import DrDashboard from "./pages/doctor/DrDashboard.jsx";
import DrSchedule from "./pages/doctor/DrSchedule.jsx";
import Appointments from "./pages/doctor/DrAppointment.jsx";
import AddNewDr from "./pages/doctor/AddNewDr.jsx";
import DrReview from "./pages/doctor/DrReview.jsx";
import TopBar from "./components/layout/TopBar.jsx";
import SideBar from "./components/layout/sidebar/SideBar.jsx";
import { Toaster } from "react-hot-toast";
import SettingsLayout from "./components/settings/SettingsLayout.jsx";
import ProfileInfo from "./components/settings/doctor/PersonalInfo";
import Verification from "./components/settings/doctor/Verification";
import Credentials from "./components/settings/doctor/Credentials";
import Security from "./components/settings/doctor/Security";
import Notifications from "./components/settings/doctor/Notifications";
import WorkPlaceSchedule from "./components/doctor/workPlace/WorkPlaceSchedule.jsx";
import PatientProfile from "./pages/doctor/PatientProfile.jsx";
// pharmacy route
import PharmacyDashboard from "./pages/pharmacy/Dashboard.jsx";
import Medicines from "./pages/pharmacy/Medicines.jsx";
import AddMedicine from "./pages/pharmacy/AddMedicine.jsx";
import Orders from "./pages/pharmacy/Orders.jsx";
import PharmacyProfile from "./pages/pharmacy/PharmacyProfile.jsx";

// Lab route
import LabDashboard from "./pages/laboratory/LabDashboard.jsx";
import LabTestProcess from "./pages/laboratory/LabTestProcess.jsx";
import LabSampleQueue from "./pages/laboratory/LabSampleQueue.jsx";
import LabPatients from "./pages/laboratory/LabPatients.jsx";
import LabTests from "./pages/laboratory/LabTests.jsx";
import LabProfile from "./pages/laboratory/LabProfile.jsx";
// admin
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
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
          : "grid grid-cols-[auto_minmax(0,1fr)] min-h-screen overflow-hidden"
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
              path="/doctor/patient/profile/:patientId/:appointmentId"
              element={<PatientProfile />}
            />

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
            <Route path="/pharmacy/medicines" element={<Medicines />} />
            <Route path="/pharmacy/add-medicine" element={<AddMedicine />} />
            <Route
              path="/pharmacy/edit-medicine/:id"
              element={<AddMedicine />}
            />
            <Route path="/pharmacy/order" element={<Orders />} />
            <Route path="/pharmacy/order/:orderId" element={<Orders />} />
            <Route path="/pharmacy/profile" element={<PharmacyProfile />} />
            {/* Lab  */}
            <Route path="/lab/dashboard" element={<LabDashboard />} />
            <Route path="/lab/profile" element={<LabProfile />} />
            <Route path="/lab/tests" element={<LabTests />} />
            <Route path="/lab/patients" element={<LabPatients />} />
            <Route path="/lab/samples" element={<LabSampleQueue />} />
            {/* <Route path="/lab/bookings" element={<LabBookings />} /> */}
            <Route path="/lab/processing" element={<LabTestProcess />} />

            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
