import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  AlertCircle, AlertTriangle, Calendar, FlaskConical, Pill 
} from 'lucide-react';

const Alerts = () => {
  // Alerts ko state mein rakha hai taaki UI dynamic ho sake
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'urgent', title: 'Urgent — Fatima Zahra needs immediate attention', desc: 'HbA1c critically high · Severe dizziness · Waiting 48 minutes', time: '10 min ago', action: 'See Now', read: false },
    { id: 2, type: 'warning', title: 'Lab report overdue — Ali Khan', desc: 'CBC + ESR requested 27 May · Still not received from CityLab', time: '1 hr ago', action: 'Follow Up', read: false },
    { id: 3, type: 'info', title: '5 appointments scheduled for tomorrow', desc: 'First: Ahmad Raza at 11:00 AM — Lab Review', time: 'Today', action: null, read: false },
    { id: 4, type: 'success', title: 'Lab report received — Nida Farooq', desc: 'Lipid Profile results available · Review before next appointment', time: '3 hrs ago', action: null, read: false },
    { id: 5, type: 'note', title: 'Follow-up reminder — Sara Ahmed', desc: 'Migraine medication ends in 2 days · Consider review', time: 'Yesterday', action: null, read: false }
  ]);

  // Mark all read function: sabki 'read' property true kar deta hai
  const markAllRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  // Sirf unread alerts ko count karta hai
  const unreadCount = alerts.filter(a => !a.read).length;

  const getIcon = (type) => {
    switch(type) {
      case 'urgent': return <AlertCircle className="text-red-500" size={24} />;
      case 'warning': return <AlertTriangle className="text-orange-500" size={24} />;
      case 'info': return <Calendar className="text-blue-500" size={24} />;
      case 'success': return <FlaskConical className="text-emerald-500" size={24} />;
      default: return <Pill className="text-purple-500" size={24} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="doctor" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Alerts</h2>
            <p className="text-sm text-gray-400">{unreadCount} unread</p>
          </div>
          <button 
            onClick={markAllRead}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all active:scale-95"
          >
            Mark all read
          </button>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-slate-800">Notifications & Alerts</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-6 flex items-start gap-4 transition-colors ${alert.read ? 'bg-white' : 'bg-blue-50/20'}`}
              >
                <div className={`mt-1 ${alert.read ? 'opacity-60' : 'opacity-100'}`}>
                  {getIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-bold ${alert.read ? 'text-gray-500' : 'text-slate-800'}`}>
                      {alert.title}
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{alert.desc}</p>
                </div>
                {alert.action && !alert.read && (
                  <button className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800">
                    {alert.action}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Alerts;