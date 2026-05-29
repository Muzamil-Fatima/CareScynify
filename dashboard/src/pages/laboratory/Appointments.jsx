import React from 'react';
import Sidebar from '../components/Sidebar';
import CustomCalendar from '../components/CustomCalendar';

const Appointments = () => {
  const appointments = [
    { date: "28 May", time: "9:00 AM", patient: "Ali Khan", type: "Checkup", status: "Today" },
    { date: "28 May", time: "10:30 AM", patient: "Sara Ahmed", type: "Follow-up", status: "Today" },
    { date: "29 May", time: "11:00 AM", patient: "Ahmad Raza", type: "Lab Review", status: "Scheduled" },
    { date: "30 May", time: "2:00 PM", patient: "Nida Farooq", type: "BP Check", status: "Scheduled" },
    { date: "31 May", time: "10:00 AM", patient: "Zara Iqbal", type: "New Patient", status: "Scheduled" },
    { date: "02 Jun", time: "3:30 PM", patient: "Tariq Shah", type: "Follow-up", status: "Confirmed" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Today': return 'bg-blue-50 text-blue-600';
      case 'Scheduled': return 'bg-gray-100 text-gray-600';
      case 'Confirmed': return 'bg-emerald-50 text-emerald-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="doctor" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Appointments</h2>
            <p className="text-sm text-gray-500">May 2026</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition">
            + New Appointment
          </button>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* Appointments Table (2/3 width) */}
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg mb-6">All Appointments — May 2026</h3>
            <table className="w-full text-sm">
              <thead className="text-gray-400 uppercase text-[10px]">
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map((a, i) => (
                  <tr key={i}>
                    <td className="py-4 text-slate-700">{a.date}</td>
                    <td className="py-4 text-slate-700">{a.time}</td>
                    <td className="py-4 font-bold text-slate-800">{a.patient}</td>
                    <td className="py-4 text-gray-600">{a.type}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${getStatusStyle(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-xs font-bold text-slate-700 hover:text-blue-600 hover:underline">
                        {a.status === 'Today' ? 'Start' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        {/* Fixed Calendar View - Updated Version */}
<div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-8">
  <h3 className="font-bold text-lg mb-6">Calendar View</h3>
  
  {/* Yahan component wrap kiya hai taaki styling conflict na ho */}
  <div className="calendar-container-wrapper">
    <CustomCalendar />
  </div>
            {/* Legend section */}
            <div className="mt-6 flex flex-col gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Blue dot = appointment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-blue-400"></span>
                <span>Blue bg = today</span>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Appointments;