import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // <-- Custom Sidebar Import
import { FlaskConical, Search, PlusCircle, Trash2, Edit, DollarSign, Clock } from 'lucide-react';

export default function Tests() {
  // Mock Data for Available Lab Tests
  const [testsList, setTestsList] = useState([
    { code: 'T-CBC', name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 1200, turnAround: '4 Hours', status: 'Active' },
    { code: 'T-LIP', name: 'Lipid Profile / Panel', category: 'Biochemistry', price: 2500, turnAround: '6 Hours', status: 'Active' },
    { code: 'T-THY', name: 'Thyroid Profile (T3, T4, TSH)', category: 'Endocrinology', price: 3200, turnAround: '12 Hours', status: 'Active' },
    { code: 'T-RBS', name: 'Random Blood Sugar (RBS)', category: 'Biochemistry', price: 300, turnAround: '1 Hour', status: 'Active' },
    { code: 'T-LFT', name: 'Liver Function Test (LFT)', category: 'Biochemistry', price: 2200, turnAround: '8 Hours', status: 'Active' },
  ]);

  // Form State for Adding New Test
  const [formData, setFormData] = useState({
    name: '',
    category: 'Biochemistry',
    price: '',
    turnAround: ''
  });

  // Search Filter State
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Add New Test)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.turnAround) {
      alert("Please enter test name, price, and turnaround time!");
      return;
    }

    // Generate random code for test
    const randomCode = `T-${formData.name.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;

    const newTest = {
      code: randomCode,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      turnAround: formData.turnAround,
      status: 'Active'
    };

    setTestsList([newTest, ...testsList]);
    
    // Reset Form fields
    setFormData({ name: '', category: 'Biochemistry', price: '', turnAround: '' });
  };

  // Delete Test Handler
  const handleDeleteTest = (code) => {
    if (window.confirm("Kya aap is test profile ko hamesha ke liye delete karna chahte hain?")) {
      setTestsList(testsList.filter(t => t.code !== code));
    }
  };

  // Filter List based on Search Term
  const filteredTests = testsList.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased">
      
         {/* SIDEBAR NAVIGATION COMPONENT */}
     <Sidebar role="admin" />

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              Tests Management
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Configure laboratory test menu matrix, pricing, and turnaround setup</p>
          </div>
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search test by name, code or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-all text-slate-700"
            />
          </div>
        </div>

        {/* Layout Grid: Create Form & List Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Create New Test Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <div className="flex items-center space-x-2.5 mb-5 text-blue-600">
              <FlaskConical size={20} />
              <h3 className="text-base font-bold text-slate-800">Add Test Profile</h3>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Test Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Liver Function Test (LFT)" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Category Group</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
                >
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Serology">Serology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Price (Rs.)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-semibold text-xs">Rs</span>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 1500" 
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Turnaround Time (TAT)</label>
                <input 
                  type="text" 
                  name="turnAround"
                  value={formData.turnAround}
                  onChange={handleInputChange}
                  placeholder="e.g. 3 Hours, 12 Hours" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 bg-[#0a1128] hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <PlusCircle size={16} />
                <span>Create Test Profile</span>
              </button>
            </form>
          </div>

          {/* Right Column: Active Laboratory Test Menu Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 bg-slate-50/60 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">Active Lab Menu Pricing ({filteredTests.length})</h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-emerald-100">Live Catalog</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-3.5 pl-5">Code</th>
                      <th className="p-3.5">Test Specification</th>
                      <th className="p-3.5">Rate / Cost</th>
                      <th className="p-3.5">TAT (Reporting)</th>
                      <th className="p-3.5 text-center pr-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {filteredTests.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">Koi test catalogue match nahi mila.</td>
                      </tr>
                    ) : (
                      filteredTests.map((test) => (
                        <tr key={test.code} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-3.5 pl-5 font-mono font-bold text-slate-400">{test.code}</td>
                          <td className="p-3.5">
                            <div>
                              <span className="font-bold text-slate-800 block text-[13px]">{test.name}</span>
                              <span className="text-slate-400 text-[10px] uppercase tracking-wide font-bold">{test.category}</span>
                            </div>
                          </td>
                          <td className="p-3.5 font-bold text-slate-800">
                            <span className="text-slate-400 font-semibold text-[10px] mr-0.5">Rs.</span>
                            {test.price.toLocaleString()}
                          </td>
                          <td className="p-3.5 text-slate-600">
                            <span className="inline-flex items-center space-x-1">
                              <Clock size={12} className="text-slate-400 mr-1" />
                              {test.turnAround}
                            </span>
                          </td>
                          <td className="p-3.5 text-center pr-5">
                            <div className="flex items-center justify-center space-x-2">
                              <button 
                                type="button"
                                onClick={() => alert(`Edit config options for ${test.code} coming soon!`)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleDeleteTest(test.code)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Catalog Meta Info Card Footer */}
            <div className="p-4 border-t border-slate-50 bg-slate-50/30 text-[11px] text-slate-400 flex justify-between items-center">
              <span>CareScynify Laboratory Inventory Module v1.0</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}