import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // <-- Custom Sidebar Integrated
import { 
  UserCheck, Search, PlusCircle, Trash2, Edit, 
  Shield, DollarSign, Clock, CheckCircle, XCircle, 
  Users, UsersRound, Award, Contact 
} from 'lucide-react'; // <-- Aakhri par Contact zaroor add karein

export default function Staff() {
  // 1. Core State: Staff Database Matrix
  const [staffList, setStaffList] = useState([
    { id: 'STF-401', name: 'Dr. Nadia Ali', role: 'Senior Pathologist', shift: 'Morning', status: 'Active', contact: '0300-9876543', salary: 120000, joinedDate: '2022-03-15' },
    { id: 'STF-402', name: 'Zeeshan Ahmad', role: 'Lab Technician', shift: 'Morning', status: 'Active', contact: '0321-4567890', salary: 45000, joinedDate: '2023-06-10' },
    { id: 'STF-403', name: 'Kamran Khan', role: 'Lab Assistant', shift: 'Night', status: 'On Leave', contact: '0333-1122334', salary: 30000, joinedDate: '2024-01-15' },
    { id: 'STF-404', name: 'Amna Pervez', role: 'Front Desk Receptionist', shift: 'Evening', status: 'Active', contact: '0345-5556667', salary: 25000, joinedDate: '2023-11-01' },
  ]);
    {/* SIDEBAR NAVIGATION COMPONENT */}
<Sidebar role="admin" />
  // 2. Form State: Onboarding Input Handler
  const [formData, setFormData] = useState({
    name: '',
    role: 'Lab Technician',
    shift: 'Morning',
    status: 'Active',
    contact: '',
    salary: ''
  });

  // 3. System States: Search & Editing Controllers
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Input Change Dispatcher
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submission (Create or Update Master Record)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.salary) {
      alert("Please fill all mandatory fields (Name, Contact, and Salary)!");
      return;
    }

    if (editingId) {
      // Edit Mode Action
      setStaffList(staffList.map(emp => 
        emp.id === editingId ? { ...emp, ...formData, salary: parseInt(formData.salary) } : emp
      ));
      setEditingId(null);
      alert("Employee record updated successfully!");
    } else {
      // Create Mode Action
      const newEmpId = `STF-${Math.floor(405 + Math.random() * 900)}`;
      const newStaff = {
        id: newEmpId,
        name: formData.name,
        role: formData.role,
        shift: formData.shift,
        status: formData.status,
        contact: formData.contact,
        salary: parseInt(formData.salary),
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setStaffList([newStaff, ...staffList]);
      alert("New employee onboarded successfully!");
    }
    
    // Form Reset Control
    setFormData({ name: '', role: 'Lab Technician', shift: 'Morning', status: 'Active', contact: '', salary: '' });
  };

  // Trigger Inline Edit Row Mode
  const startEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      role: employee.role,
      shift: employee.shift,
      status: employee.status,
      contact: employee.contact,
      salary: employee.salary
    });
  };

  // Cancel Editing Runtime State
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', role: 'Lab Technician', shift: 'Morning', status: 'Active', contact: '', salary: '' });
  };

  // Delete Record Execution Block
  const handleDeleteStaff = (id, name) => {
    if (window.confirm(`Kya aap ${name} ka complete official record pipeline se delete karna chahte hain?`)) {
      setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  // Search Filtering Engine
  const filteredStaff = staffList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Administrative Financial Metrics Calculations
  const totalStaffCount = staffList.length;
  const activeStaffCount = staffList.filter(s => s.status === 'Active').length;
  const totalMonthlyPayroll = staffList.reduce((acc, curr) => acc + curr.salary, 0);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased">
      
          {/* SIDEBAR NAVIGATION COMPONENT */}
      <Sidebar role="admin" />

      {/* ADMIN CONTENT CONTROLLER FRAME */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Module Header Segment */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              Human Resource Command Center
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Manage workforce hierarchy, payroll rosters, system shifts, and credential authorizations</p>
          </div>
          
          {/* Live Search Engine Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search by Employee ID, Name or Role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-all text-slate-700"
            />
          </div>
        </div>

        {/* Executive Overview Analytics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Strength</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{totalStaffCount} Registered</h3>
              <p className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5 mt-1">
                <UsersRound size={12} className="mr-0.5" /> Lab Human Resources Matrix
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Roll Call</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{activeStaffCount} On Duty</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                {totalStaffCount - activeStaffCount} Members resting/on-leave
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Payroll/Mo</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">Rs. {totalMonthlyPayroll.toLocaleString()}</h3>
              <p className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5 mt-1">
                <Award size={12} className="mr-0.5" /> Financial budget overhead
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        {/* Master Double Section Workspace Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Dynamic Administration Panel Form (Create/Edit Toggle state) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit sticky top-6">
            <div className="flex items-center space-x-2.5 mb-5 text-blue-600">
              <UserCheck size={20} />
              <h3 className="text-base font-bold text-slate-800">
                {editingId ? "Modify Employee Access" : "Onboard New Employee"}
              </h3>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Legal Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Haris Naseem" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Designation Role</label>
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
                >
                  <option value="Senior Pathologist">Senior Pathologist</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Lab Assistant">Lab Assistant</option>
                  <option value="Front Desk Receptionist">Front Desk Receptionist</option>
                  <option value="HR / Admin Officer">HR / Admin Officer</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Duty Roster Shift</label>
                  <select 
                    name="shift"
                    value={formData.shift}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Duty Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
                  >
                    <option value="Active">Active Duty</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Salary (PKR)</label>
                  <input 
                    type="number" 
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. 45000" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Number</label>
                  <input 
                    type="text" 
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="e.g. 03211234567" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              {/* Form Action CTA Controllers */}
              <div className="flex flex-col gap-2 pt-2">
                <button 
                  type="submit" 
                  className={`w-full text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 ${
                    editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0a1128] hover:bg-slate-800'
                  }`}
                >
                  <PlusCircle size={16} />
                  <span>{editingId ? "Commit Safe Changes" : "Save and Deploy Staff"}</span>
                </button>

                {editingId && (
                  <button 
                    type="button"
                    onClick={cancelEdit}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-2.5 rounded-xl transition-all"
                  >
                    Cancel Modification
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Live Roster HR Data Ledger Database Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 bg-slate-50/60 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">Corporate Employee Database Roster ({filteredStaff.length})</h3>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-blue-100">HR Core Live</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-3.5 pl-5">Staff Code</th>
                      <th className="p-3.5">Employee Framework Details</th>
                      <th className="p-3.5">Payroll Scale</th>
                      <th className="p-3.5">Assigned Shift</th>
                      <th className="p-3.5 text-center pr-5">Roster Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {filteredStaff.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">System Matrix Warning: No registered employee profiles found.</td>
                      </tr>
                    ) : (
                      filteredStaff.map((staff) => (
                        <tr key={staff.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-3.5 pl-5 font-mono font-bold text-slate-400">{staff.id}</td>
                          <td className="p-3.5">
                            <div>
                              <span className="font-bold text-slate-800 block text-[13px]">{staff.name}</span>
                              <span className="text-slate-400 text-[10px] font-bold flex items-center gap-1 mt-0.5">
                                <Shield size={10} className="text-blue-500" /> {staff.role} • <Contact size={10} /> {staff.contact}
                              </span>
                            </div>
                          </td>
                          <td className="p-3.5 font-bold text-slate-800">
                            <span className="text-slate-400 font-semibold text-[10px] mr-0.5">Rs.</span>
                            {staff.salary.toLocaleString()}
                          </td>
                          <td className="p-3.5 text-slate-800 font-semibold">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 font-medium text-[11px]">
                              <Clock size={11} className="mr-1 text-slate-400" /> {staff.shift}
                            </span>
                          </td>
                          <td className="p-3.5 text-center pr-5">
                            <div className="flex items-center justify-between space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                                staff.status === 'Active' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                  : staff.status === 'On Leave'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                  : 'bg-red-50 text-red-700 border border-red-100'
                              }`}>
                                {staff.status}
                              </span>
                              
                              {/* Row Action Utility Buttons Box */}
                              <div className="flex items-center space-x-1">
                                <button 
                                  type="button"
                                  onClick={() => startEdit(staff)}
                                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                  title="Edit Credentials"
                                >
                                  <Edit size={14} />
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => handleDeleteStaff(staff.id, staff.name)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                  title="Terminated Contract"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Micro Metadata Brand Footer Card */}
            <div className="p-4 border-t border-slate-50 bg-slate-50/30 text-[11px] text-slate-400 flex justify-between items-center">
              <span>CareScynify Advanced Human Capital Framework Management Panel v1.5</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}