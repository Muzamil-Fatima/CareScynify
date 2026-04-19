import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// layouts
import PublicLayout from "./layout/PublicLayout";
import AppLayout from "./layout/AppLayout";

// public pages
import LandingPage from "./pages/Home/LandingPage";
import AboutUs from "./pages/About/AboutUs";
import Doctor from "./pages/doctor/Doctor";
import Laboratory from "./pages/laboratory/Laboratory";
import Hospital from "./pages/hospital/Hospital";
import HospitalDetail from "./pages/hospital/HospitalDetail";
import Clinic from "./pages/clinic/Clinic";
import ClinicDetail from "./pages/clinic/ClinicDetail";
import ClinicDrProfile from "./pages/clinic/ClinicDrProfile";
import Pharmacy from "./pages/pharmacy/Pharmacy";
import Jobs from "./pages/jobs/Jobs";
import DoctorProfile from "./pages/doctor/DoctorProfile";
//  auth pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import Forget from "./pages/Auth/Forget";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword";

//  App Pages
import PatientProfile from "./pages/profile/PatientProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import Appointments from "./pages/appointments/Appointments";
import Reports from "./pages/reports/Reports";
import AIInsights from "./pages/ai/AIInsights";
import Settings from "./pages/settings/Settings";
import RootLayout from "./layout/RootLayout";

function App() {
  return (
    <RootLayout>
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

      {/* App Routes */}
      <Routes>
        {/* PUBLIC AREA (Navbar + Footer inside PublicLayout) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctor/:id" element={<ClinicDrProfile />} />
          <Route path="/clinic" element={<Clinic />} />
          <Route path="/clinic/:id" element={<ClinicDetail />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<Forget />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* APP AREA (Sidebar system) */}
        <Route element={<AppLayout />}>
          <Route path="/profile" element={<PatientProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </RootLayout>
  );
}

export default App;
