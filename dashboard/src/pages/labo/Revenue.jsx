import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // <-- Custom Sidebar Import
import { DollarSign, Search, PlusCircle, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';

export default function Revenue() {
  // Mock Data for Billing Transactions
  const [transactions, setTransactions] = useState([
    { invoiceNo: 'INV-1042', patientName: 'Ali Khan', testName: 'Blood CBC', amount: 1200, method: 'Cash', status: 'Paid', date: '2026-05-25' },
    { invoiceNo: 'INV-1043', patientName: 'Sara Raza', testName: 'Lipid Panel', amount: 2500, method: 'EasyPaisa', status: 'Paid', date: '2026-05-25' },
    { invoiceNo: 'INV-1044', patientName: 'M. Hassan', testName: 'Thyroid Profile', amount: 3200, method: 'Card', status: 'Pending', date: '2026-05-24' },
    { invoiceNo: 'INV-1045', patientName: 'Fatima Ahmed', testName: 'Urine Routine', amount: 300, method: 'Cash', status: 'Paid', date: '2026-05-24' },
    { invoiceNo: 'INV-1046', patientName: 'Zainab Bibi', testName: 'Liver Function (LFT)', amount: 2200, method: 'JazzCash', status: 'Paid', date: '2026-05-23' },
  ]);

  // Form State for Quick Billing / Invoice Generation
  const [formData, setFormData] = useState({
    patientName: '',
    testName: '',
    amount: '',
    method: 'Cash',
    status: 'Paid'
  });

  // Search Filter State
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Generate Quick Invoice)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.testName || !formData.amount) {
      alert("Please enter patient name, test assigned, and billing amount!");
      return;
    }

    const nextInvNum = `INV-${1042 + transactions.length + Math.floor(Math.random() * 10)}`;

    const newInvoice = {
      invoiceNo: nextInvNum,
      patientName: formData.patientName,
      testName: formData.testName,
      amount: parseInt(formData.amount),
      method: formData.method,
      status: formData.status,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([newInvoice, ...transactions]);
    
    // Reset Form fields
    setFormData({ patientName: '', testName: '', amount: '', method: 'Cash', status: 'Paid' });
  };

  // Filter Transaction List based on Search Term
  const filteredTransactions = transactions.filter(t => 
    t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Quick Math Metrics (Live Calculation)
  const totalEarnings = transactions.reduce((acc, curr) => curr.status === 'Paid' ? acc + curr.amount : acc, 0);
  const pendingEarnings = transactions.reduce((acc, curr) => curr.status === 'Pending' ? acc + curr.amount : acc, 0);

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
              Financial & Revenue Metrics
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Track daily lab billing records, generate counter receipts, and audit collections</p>
          </div>
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search invoice number or patient..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-all text-slate-700"
            />
          </div>
        </div>

        {/* 3 Analytics Financial Counter Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Received Gross</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">Rs. {totalEarnings.toLocaleString()}</h3>
              <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                <ArrowUpRight size={12} /> +12.4% from yesterday
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outstanding Accounts</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">Rs. {pendingEarnings.toLocaleString()}</h3>
              <p className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5 mt-1">
                Awaiting clearance reports
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
              <CreditCard size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Invoices Issued</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{transactions.length} Orders</h3>
              <p className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5 mt-1">
                100% digital trace matrix
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
          </div>
        </div>

        {/* Layout Grid: Invoice Maker & Statement Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Quick Invoice Generator Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <div className="flex items-center space-x-2.5 mb-5 text-blue-600">
              <DollarSign size={20} />
              <h3 className="text-base font-bold text-slate-800">Quick Counter Billing</h3>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Patient Name</label>
                <input 
                  type="text" 
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="e.g. Aslam Pervez" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Assigned Test Profiling</label>
                <input 
                  type="text" 
                  name="testName"
                  value={formData.testName}
                  onChange={handleInputChange}
                  placeholder="e.g. Lipid Profile / Lipid Panel" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Fee Charge (Rs)</label>
                  <input 
                    type="number" 
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Fee in PKR" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gateway Mode</label>
                  <select 
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Debit Card</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="JazzCash">JazzCash</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Collection Clearance Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
                >
                  <option value="Paid">Cleared / Paid Full</option>
                  <option value="Pending">Pending Clearance</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 bg-[#0a1128] hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <PlusCircle size={16} />
                <span>Publish Invoice Token</span>
              </button>
            </form>
          </div>

          {/* Right Column: Statement Transaction Database Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 bg-slate-50/60 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">Transactional Ledger Statement ({filteredTransactions.length})</h3>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-blue-100">Audit Active</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-3.5 pl-5">Invoice No</th>
                      <th className="p-3.5">Client & Clinical Test</th>
                      <th className="p-3.5">Payment Type</th>
                      <th className="p-3.5">Gross Total</th>
                      <th className="p-3.5 text-center pr-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">Koi financial record match nahi mila.</td>
                      </tr>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <tr key={tx.invoiceNo} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-3.5 pl-5 font-mono font-bold text-blue-600">{tx.invoiceNo}</td>
                          <td className="p-3.5">
                            <div>
                              <span className="font-bold text-slate-800 block text-[13px]">{tx.patientName}</span>
                              <span className="text-slate-400 text-[10px] font-medium">{tx.testName} • {tx.date}</span>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-600">
                            <span className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-700 font-bold rounded">
                              {tx.method}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-slate-800">
                            Rs. {tx.amount.toLocaleString()}
                          </td>
                          <td className="p-3.5 text-center pr-5">
                            <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                              tx.status === 'Paid' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {tx.status}
                            </span>
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
              <span>CareScynify Accounts Ledger Secure Frame v1.0</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}