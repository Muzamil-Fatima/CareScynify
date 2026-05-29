import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
      
      {/* Search Bar - User ke liye data dhoondne ka shortcut */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search records, tests, or results..." 
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
        />
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative text-slate-400 hover:text-blue-600 transition-colors">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">Patient Name</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Patient</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            P
          </div>
        </div>
      </div>
    </header>
  );
}