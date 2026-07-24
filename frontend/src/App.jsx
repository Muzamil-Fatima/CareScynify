import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// layouts
import PublicLayout from "./layout/PublicLayout";
import AppLayout from "./layout/AppLayout";

// public pages
import LandingPage from "./pages/Home/LandingPage";
import AboutUs from "./pages/AboutUs";
import Doctor from "./pages/doctor/Doctor";
import Laboratory from "./pages/laboratory/Laboratory";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import BookAppointment from "./Components/doctor/BookAppointment";
import RoleSelection from "./pages/RoleSelection";
// pharmacy
import Pharmacy from "./pages/pharmacy/Pharmacy";
import Medicine from "./pages/pharmacy/Medicine";
import Cart from "./pages/pharmacy/Cart";
import Checkout from "./pages/pharmacy/Checkout";
//  auth pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import Forget from "./pages/Auth/Forget";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword";

//  App Pages
import PatientProfile from "./pages/patients/PatientProfile";
import Dashboard from "./pages/patients/Dashboard";
import Appointments from "./pages/patients/Appointments";
import Reports from "./pages/patients/Reports";
import PdfViewer from "./Components/reports/ReportViewer";
import Settings from "./pages/patients/Settings";
import RootLayout from "./layout/RootLayout";
import Security from "./Components/settings/Security";
import SymptomAnalyzer from "./pages/patients/SymptomAnalyzer";
import MedicineDetails from "./pages/pharmacy/MedicineDetail";
import OrderSuccess from "./pages/pharmacy/OrderSuccess";
import MyOrders from "./pages/patients/MyOrder";
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
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/doctor/:id/book" element={<BookAppointment />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          {/* pharmacy */}
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/medicine/:id" element={<MedicineDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
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
          <Route path="/report-viewer" element={<PdfViewer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/security" element={<Security />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/symptom-analyzer" element={<SymptomAnalyzer />} />
        </Route>
      </Routes>
    </RootLayout>
  );
}

export default App;
