import React from 'react';

const Schedule = () => {
  const scheduleData = [
    { time: "9:00 AM", name: "Ali Khan", desc: "General Checkup", color: "border-emerald-500" },
    { time: "10:30 AM", name: "Sara Ahmed", desc: "Follow-up - Headache", color: "border-blue-500" },
    { time: "12:00 PM", name: "Fatima Zahra", desc: "Urgent - Diabetes", color: "border-red-500" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="font-bold text-slate-800 mb-6">Today's Schedule</h3>
      <div className="space-y-6">
        {scheduleData.map((item, index) => (
          <div key={index} className={`border-l-4 pl-4 ${item.color}`}>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{item.time}</p>
            <p className="font-semibold text-sm text-slate-800">{item.name}</p>
            <p className="text-[10px] text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;