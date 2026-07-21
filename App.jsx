import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import Staff from "./pages/Staff";
import Tests from "./pages/Tests";
import Patients from "./pages/Patients";
import Revenue from "./pages/Revenue";
import Settings from "./pages/Settings";
import TestAI from "./pages/TestAI";
//patient pages
import PatientDashboard from "./pages/PatientDashboard"; 
import MyReports from './pages/MyReports';// Yahan se /PatientDashboard hata diya gaya h/ Path se /PatientDashboard hata dein
import BookAppointments from "./pages/BookAppointments";
import HealthProfile from "./pages/HealthProfile";
//doctor pages
import DoctorDashboard from './pages/DoctorDashboard';
import PatientQueue from './pages/PatientQueue';
import Prescription from './pages/Prescription';
import PatientHistory from './pages/PatientHistory';
import Appointments from './pages/Appointments';
import LabReports from './pages/LabReports';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import MyProfile from './pages/MyProfile';
//Staff pages
import StaffDashboard from './pages/StaffDashboard';
import SampleQueue from './pages/SampleQueue';
import TestProcess from './pages/TestProcess';
import QCMonitor from './pages/QCMonitor';
import Attendance from './pages/Attendance';
import SystemNotifications from './pages/SystemNotifications';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Admin Routes */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/test-ai" element={<TestAI />} />
        
        {/* Patient Routes */}
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/myreports" element={<MyReports />} />
        <Route path="/book-appointments" element={<BookAppointments />} />
        <Route path="/health-profile" element={<HealthProfile />} />
        {/*doctor routes*/}
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/patient-queue" element={<PatientQueue />} />
        <Route path="/prescriptions" element={<Prescription />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/lab-reports" element={<LabReports />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<MyProfile />} />
        {/* Staff Routes */}
        <Route path="/qc" element={<QCMonitor />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/notifications" element={<SystemNotifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;