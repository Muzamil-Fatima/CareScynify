import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
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
function App() {
  return (
    <div className="grid  grid-cols-[auto_1fr] min-h-screen">
      <SideBar />
      <div className=" p-6 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/receptionists" element={<Receptionists />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </div>
      <SideIcon />
    </div>
  );
}

export default App;
