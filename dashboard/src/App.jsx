import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import TopBar from "./components/layout/TopBar.jsx";
import SideBar from "./components/layout/sidebar/SideBar.jsx";
import VerificationBanner from "./components/common/VerificationBanner";
import { useAuth } from "./hooks/useAuth";
// setting routes
import Notifications from "./components/settings/doctor/Notifications";
import Credentials from "./components/settings/doctor/Credentials";
import Security from "./components/settings/doctor/Security";
import Verification from "./components/settings/doctor/Verification";
import SettingsLayout from "./components/settings/SettingsLayout.jsx";
import ProfileInfo from "./components/settings/doctor/PersonalInfo";
// doctor routes
import DrReview from "./pages/doctor/DrReview.jsx";
import AddNewDr from "./pages/doctor/AddNewDr.jsx";
import Appointments from "./pages/doctor/DrAppointment.jsx";
import DrSchedule from "./pages/doctor/DrSchedule.jsx";
import DrDashboard from "./pages/doctor/DrDashboard.jsx";
import Patients from "./pages/doctor/DrPatients.jsx";
import Appointment from "./pages/doctor/DrAppointment.jsx";
import PatientProfile from "./pages/doctor/PatientProfile.jsx";
import ReportViewer from "./components/doctor/PatientProfile/reports/ReportViewer.jsx";
import VideoConsultation from "./pages/doctor/VideoConsultation.jsx";
import WorkPlaceSchedule from "./components/doctor/workPlace/WorkPlaceSchedule.jsx";
import Chatbot from "./pages/doctor/Chatbot.jsx";
// pharmacy route
import PharmacyDashboard from "./pages/pharmacy/Dashboard.jsx";
import Medicines from "./pages/pharmacy/Medicines.jsx";
import AddMedicine from "./pages/pharmacy/AddMedicine.jsx";
import Orders from "./pages/pharmacy/Orders.jsx";
import PharmacyProfile from "./pages/pharmacy/PharmacyProfile.jsx";
import DirectSalesHistory from "./pages/pharmacy/DirectSalesHistory.jsx";
import DirectSale from "./pages/pharmacy/DirectSale.jsx";
import DirectSaleInvoice from "./pages/pharmacy/DirectSaleInvoice.jsx";
// Lab route
import LabDashboard from "./pages/laboratory/LabDashboard.jsx";
import LabTestProcess from "./pages/laboratory/LabTestProcess.jsx";
import LabSampleQueue from "./pages/laboratory/LabSampleQueue.jsx";
import LabPatients from "./pages/laboratory/LabPatients.jsx";
import LabTests from "./pages/laboratory/LabTests.jsx";
import LabProfile from "./pages/laboratory/LabProfile.jsx";
import LabCreateReport from "./pages/laboratory/LabCreateReport.jsx";
import LabReports from "./pages/laboratory/LabReports.jsx";
import LabReportDetails from "./pages/laboratory/LabReportDetails.jsx";
// admin
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import RequestToVerify from "./pages/admin/RequestToVerify.jsx";
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("");
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith("/settings");

  const { user } = useAuth();

  const showVerificationBanner = user && user.accountVerified === false;
  return (
    <>
      {!isSettingsPage}

      {showVerificationBanner && <VerificationBanner />}
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
              <Route
                path="/workplace/schedule"
                element={<WorkPlaceSchedule />}
              />
              <Route path="/patients" element={<Patients />} />
              <Route
                path="/doctor/patient/profile/:patientId/:appointmentId"
                element={<PatientProfile />}
              />
              <Route
                path="/doctor/patient/profile/:patientId"
                element={<PatientProfile />}
              />
              <Route
                path="/report-viewer/:reportId"
                element={<ReportViewer />}
              />

              <Route
                path="/video/:appointmentId"
                element={<VideoConsultation />}
              />
              <Route
                path="/doctor/chatbot"
                element={user?.role === "doctor" ? <Chatbot /> : null}
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
              <Route
                path="/pharmacy/dashboard"
                element={<PharmacyDashboard />}
              />
              <Route path="/pharmacy/medicines" element={<Medicines />} />
              <Route path="/pharmacy/add-medicine" element={<AddMedicine />} />
              <Route
                path="/pharmacy/edit-medicine/:id"
                element={<AddMedicine />}
              />
              <Route path="/pharmacy/order" element={<Orders />} />
              <Route path="/pharmacy/order/:orderId" element={<Orders />} />
              <Route path="/pharmacy/profile" element={<PharmacyProfile />} />
              <Route
                path="/pharmacy/direct-sales"
                element={<DirectSalesHistory />}
              />

              <Route
                path="/pharmacy/direct-sales/new"
                element={<DirectSale />}
              />

              <Route
                path="/pharmacy/direct-sales/:id"
                element={<DirectSale />}
              />

              <Route
                path="/pharmacy/direct-sales/:id/invoice"
                element={<DirectSaleInvoice />}
              />
              {/* Lab  */}
              <Route path="/lab/dashboard" element={<LabDashboard />} />
              <Route path="/lab/profile" element={<LabProfile />} />
              <Route path="/lab/tests" element={<LabTests />} />
              <Route path="/lab/patients" element={<LabPatients />} />
              <Route path="/lab/samples" element={<LabSampleQueue />} />
              {/* <Route path="/lab/bookings" element={<LabBookings />} /> */}
              <Route path="/lab/processing" element={<LabTestProcess />} />
              {/* Reports */}
              <Route
                path="/lab/reports/create/:sampleId"
                element={<LabCreateReport />}
              />
              <Route path="/lab/reports" element={<LabReports />} />
              <Route
                path="/lab/reports/:reportId"
                element={<LabReportDetails />}
              />

              {/* admin */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/verification" element={<RequestToVerify />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
