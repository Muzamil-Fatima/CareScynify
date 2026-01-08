import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Overview from "./pages/overView/OverView";
import Appointment from "./pages/appointments/Appointment";
import Doctor from "./pages/doctor/Doctor";
import HelpCenter from "./pages/helpCenter/HelpCenter";
import Laboratory from "./pages/laboratory/Laboratory";
import Patients from "./pages/patients/Patients";
import Settings from "./pages/setting/Settings";
function App() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
