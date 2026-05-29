import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, FlaskConical, DollarSign, UserCheck, Activity, LogOut, 
  Settings, CalendarPlus, User, FileText, Pill, BarChart3, Bell, 
  ScanBarcode, Search, Filter, AlertTriangle, CheckCircle2, Clock, MoreVertical ,Bot
} from 'lucide-react';

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Role based Menu Items
  const menuConfig = {

    staff: [
      { name: 'Dashboard', path: '/staffdashboard', icon: <Activity size={18} /> },
      { name: 'Sample Queue', path: '/queue', icon: <Users size={18} /> },
      { name: 'Test Process', path: '/process', icon: <ScanBarcode size={18} /> },
      { name: 'QC Monitor', path: '/qc', icon: <FlaskConical size={18} /> },
      { name: 'Attendance', path: '/attendance', icon: <UserCheck size={18} /> },
      { name: 'System Notifications', path: '/notifications', icon: <Bell size={18} /> },
    ],
    
    patient: [
      { name: 'Dashboard', path: '/patientdashboard', icon: <Activity size={18} /> },
      { name: 'MyReports', path: '/myreports', icon: <FileText size={18} /> },
      { name: 'Book Appointment', path: '/book-appointments', icon: <CalendarPlus size={18} /> },
      { name: 'Health Profile', path: '/health-profile', icon: <User size={18} /> },
    ],
   doctor: [
      { name: 'Dashboard', path: '/doctordashboard', icon: <Activity size={18} /> },
      { name: 'Patient Queue', path: '/patient-queue', icon: <Users size={18} /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <Pill size={18} /> },
      { name: 'Appointments', path: '/appointments', icon: <CalendarPlus size={18} /> },
      { name: 'Lab Reports', path: '/lab-reports', icon: <FlaskConical size={18} /> },
      { name: 'Patient History', path: '/patient-history', icon: <FileText size={18} /> },
  { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={18} /> },
  { name: 'Alerts', path: '/alerts', icon: <Bell size={18} /> },
  { name: 'My Profile', path: '/profile', icon: <User size={18} /> },
    ],
    admin: [
      { name: 'Dashboard', path: '/admindashboard', icon: <Activity size={18} /> },
      { name: 'Patients', path: '/patients', icon: <Users size={18} /> },
      { name: 'Tests', path: '/tests', icon: <FlaskConical size={18} /> },
      { name: 'Revenue', path: '/revenue', icon: <DollarSign size={18} /> },
      { name: 'Staff', path: '/staff', icon: <UserCheck size={18} /> },
      { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
      { name: 'AI Assistant', path: '/test-ai', icon: <Bot size={18} /> },
    ]
    
  };

  const menuItems = menuConfig[role] || [];

  return (
    <aside className="w-64 bg-[#0a1128] text-gray-300 flex flex-col justify-between p-6 shadow-xl shrink-0 min-h-screen sticky top-0">
      
      <div>
        <div className="mb-10 pl-2">
          <h1 className="text-2xl font-bold text-white tracking-wide">CareScynify</h1>
          <p className="text-xs text-blue-400 font-semibold mt-1 uppercase">{role} Panel</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, idx) => {
            const active = isActive(item.path);
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-left transition-all duration-200 ${
                  active 
                    ? 'bg-white text-[#0a1128] shadow-lg' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-800 pt-4 pl-2 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-400 text-sm capitalize">{role}</p>
            <p className="text-[10px] mt-0.5 text-gray-500">CareScynify System</p>
          </div>
          <button 
            onClick={() => {
              if(window.confirm("Kya aap Sign Out karna chahte hain?")) {
                navigate('/');
              }
            }}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
      
    </aside>
  );
}