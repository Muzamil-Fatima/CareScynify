import React from 'react';
import Sidebar from '../components/Sidebar';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

const Analytics = () => {
  const barData = [
    { name: 'Mon', count: 4000 }, { name: 'Tue', count: 6000 }, { name: 'Wed', count: 3500 },
    { name: 'Thu', count: 7000 }, { name: 'Fri', count: 5000 }, { name: 'Sat', count: 3000 }, { name: 'Sun', count: 1500 },
  ];

  const pieData = [
    { name: 'Hypertension', value: 35 }, { name: 'Fever/Viral', value: 25 }, 
    { name: 'Diabetes', value: 18 }, { name: 'Back Pain', value: 12 }, { name: 'Other', value: 10 }
  ];
  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="doctor" />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Analytics</h2>
        
        {/* Top Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { l: 'THIS MONTH', v: '148', sub: '+12% vs last month', c: 'text-green-500' },
            { l: 'PRESCRIPTIONS', v: '92', sub: '+5 this week', c: 'text-green-500' },
            { l: 'RECOVERY RATE', v: '94%', sub: '+2% improvement', c: 'text-green-500' },
            { l: 'AVG SESSION', v: '18m', sub: 'Per consultation', c: 'text-gray-400' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
              <p className="text-[10px] text-gray-400 font-bold mb-1">{s.l}</p>
              <h3 className="text-2xl font-bold text-slate-800">{s.v}</h3>
              <p className={`text-[10px] ${s.c}`}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="font-bold text-slate-800 mb-4">Patients Per Day (This Week)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="font-bold text-slate-800 mb-4">Top Diagnoses</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                  {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section: Demographics & Summary Side-by-Side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Patient Demographics */}
          <div className="bg-white p-6 rounded-2xl border">
            <h3 className="font-bold text-slate-800 mb-6">Patient Demographics</h3>
            <div className="space-y-4 mb-8">
              {[ { label: 'Male', val: '58%', color: 'bg-blue-600' }, { label: 'Female', val: '42%', color: 'bg-purple-500' } ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-2"><span>{item.label}</span> <span>{item.val}</span></div>
                  <div className="w-full h-2 bg-gray-100 rounded-full"><div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div></div>
                </div>
              ))}
            </div>
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Age Groups</h4>
            <div className="space-y-4">
              {[ { label: '18-30 yrs', val: '22%', color: 'bg-cyan-500' }, { label: '31-50 yrs', val: '45%', color: 'bg-orange-500' }, { label: '51+ yrs', val: '33%', color: 'bg-red-500' } ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-2"><span>{item.label}</span> <span>{item.val}</span></div>
                  <div className="w-full h-2 bg-gray-100 rounded-full"><div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div></div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Summary Table */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Monthly Summary</h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 uppercase border-b border-gray-50">
                  <th className="pb-4 font-bold">Month</th><th className="pb-4 font-bold">Patients</th><th className="pb-4 font-bold">Rx</th><th className="pb-4 font-bold">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { m: 'March 2026', p: '112', r: '78' },
                  { m: 'April 2026', p: '132', r: '88' },
                  { m: 'May 2026', p: '148', r: '92', active: true }
                ].map((row, i) => (
                  <tr key={i} className={row.active ? 'bg-blue-50/30' : ''}>
                    <td className={`py-4 font-bold ${row.active ? 'text-blue-600' : 'text-slate-800'}`}>{row.m} {row.active && '✦'}</td>
                    <td className="py-4 text-slate-600">{row.p}</td><td className="py-4 text-slate-600">{row.r}</td><td className="py-4 text-emerald-500 font-bold">↑</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;