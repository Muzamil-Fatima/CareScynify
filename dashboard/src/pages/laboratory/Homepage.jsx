import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react';
import { 
  FlaskConical, ArrowRight, Users, 
  BarChart3, ShieldAlert, CheckCircle2, Mail, Phone, MapPin 
} from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const menuOptions = [
  { name: 'Admin', path: '/admindashboard' },
  { name: 'Patient', path: '/patientdashboard' },
  { name: 'Doctor', path: '/doctordashboard' },
  { name: 'Staff', path: '/staffdashboard' },
];
  return (
    <div className="w-full min-h-screen bg-[#070b19] text-white antialiased select-none" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* 🌐 PREMIUM GLASS NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#0c1427]/80 backdrop-blur-xl border-b border-slate-800/60 px-6 md:px-12">
        <nav className="max-w-7xl mx-auto flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <FlaskConical className="text-blue-400" size={24} />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">CareScynify</span>
          </div>
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            <li className="hidden sm:block">
              <Link to="/about" className="text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link to="/contact" className="text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors duration-200">
                Contact
              </Link>
            </li>
            <li>
             {/* Yeh wo jagah hai jahan pehle Admin Portal ka button tha */}
<div className="relative">
  <button 
    onClick={() => setIsOpen(!isOpen)} 
    className="p-2 text-white hover:bg-white/10 rounded-lg transition-all"
  >
    {isOpen ? <X size={28} /> : <Menu size={28} />}
  </button>

  {/* Dropdown Options */}
  {isOpen && (
    <div className="absolute top-12 right-0 w-48 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden z-50 text-gray-800">
      {menuOptions.map((option) => (
        <button
          key={option.name}
          onClick={() => {
            navigate(option.path);
            setIsOpen(false);
          }}
          className="w-full text-left px-6 py-3 hover:bg-blue-50 font-bold transition-all border-b last:border-0"
        >
          {option.name} Dashboard
        </button>
      ))}
    </div>
  )}
</div>
            </li>
          </ul>
        </nav>
      </header>

     {/* 🌟 FULL COVER BACKGROUND HERO SECTION - Updated for Clarity */}
<section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
  
  {/* Real Dynamic Background Graphic Pipeline */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/banner.jpg" 
      alt="Laboratory Matrix Background" 
      // saturate-[0.6] se blue tint kam hoga, brightness-[0.8] se image clear hogi
      className="w-full h-full object-cover object-center scale-105 filter saturate-[0.6] brightness-[0.8] contrast-[1.05]" 
    />
    
    {/* Dashboard Theme Gradient Overlay Layer - Overlay ko thoda halka kiya hai taake image dikhe */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#0c1427]/40 to-[#0c1427]/60"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/70 via-[#070b19]/10 to-transparent"></div>
  </div>

  {/* Content Box Over The Background */}
  <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    <div className="lg:col-span-9 flex flex-col gap-6 text-left">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/40 backdrop-blur-md rounded-full w-fit">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Next-Gen Laboratory Intelligence</span>
      </div>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-md">
        Smart Laboratory <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">Management</span> System
      </h1>
      <p className="text-base sm:text-xl text-slate-100 max-w-2xl font-semibold leading-relaxed drop-shadow-md bg-[#070b19]/40 p-2 rounded-xl backdrop-blur-[2px] w-fit">
        Optimize clinical diagnostics workflows, automate real-time billing logs, and scale secure electronic health records delivery tracks through a unified management architecture dashboard.
      </p>
      <div className="pt-4">
       <Link to="/patient/dashboard" className="inline-flex items-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all">
  <span>Book Appointment</span>
  <ArrowRight size={18} />
</Link>
      </div>
    </div>
  </div>
</section>

     {/* 🧬 CORE FEATURES ECOSYSTEM - Updated to White Background */}
<section className="py-24 px-6 md:px-12 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
      <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Ecosystem Track</span>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Our Smart Laboratory Features</h2>
      <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-1"></div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { icon: FlaskConical, title: "Test Directory", desc: "Organize clinical biological test parameter limits, custom ranges, and reference intervals." },
        { icon: Users, title: "Patient Profile", desc: "Log active patient registration tickets, audit custom invoices, and automate reports." },
        { icon: BarChart3, title: "Revenue Audit", desc: "Monitor cash flow parameters, balance tracking ledgers, and export summaries." },
        { icon: ShieldAlert, title: "Secure Encryption", desc: "Multi-tier gatekeeper access authentications shielding sensitive patient data." }
      ].map((item, index) => (
        <div key={index} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex justify-center items-center mb-6">
            <item.icon size={22} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* 🧫 WORKSPACE OPTIMIZATION SECTION */}
      {/* 🧫 WORKSPACE OPTIMIZATION SECTION - Updated to White Background */}
<section className="bg-white border-y border-slate-200 py-24 px-6 md:px-12">
  <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
      Workspace Optimization
    </span>
    <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
      Digitalizing Diagnostic Clinical Paradigms
    </h2>
    <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
      CareScynify bridges the gap between conventional biological analysis procedures and automated dynamic monitoring tracks. From automatic generation of internal shift tokens to processing custom diagnostics matrices, our platform minimizes human intervention risk factors effortlessly.
    </p>
    <div className="flex justify-center gap-8 flex-wrap mt-2">
      <div className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
        <CheckCircle2 size={18} className="text-emerald-600" />
        <span>100% Data Security Audit Matrix</span>
      </div>
      <div className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
        <CheckCircle2 size={18} className="text-emerald-600" />
        <span>Dynamic Workforce Resource Control</span>
      </div>
    </div>
  </div>
</section>

  {/* 💬 CLINICAL REVIEWS - Updated to White Theme */}
<section className="py-24 px-6 md:px-12 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
      <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Institutional Reviews</span>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Trusted By Healthcare Experts</h2>
      <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mt-1"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { 
          review: "CareScynify has completely streamlined our laboratory patient pathways. Operational invoicing tracking and dynamic database lookups execute within milliseconds!",
          name: "Dr. Nadia Ali",
          title: "Senior Pathology Lead"
        },
        { 
          review: "The administrative console panel data structure view is incredibly straightforward. Adding record parameters and fetching real-time lab counts is intuitive.",
          name: "Zeeshan Ahmad",
          title: "Lab Infrastructure Technologist"
        },
        { 
          review: "Managing active lab staff shifts rosters, balancing processing accounts pipelines, and tracking pending outstanding files data is exceptionally efficient.",
          name: "Qadeer Tariq",
          title: "Chief Executive Officer"
        }
      ].map((item, index) => (
        <div key={index} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between gap-6 hover:border-blue-100 transition-all">
          <p className="italic text-slate-600 text-sm font-medium leading-relaxed">"{item.review}"</p>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{item.name}</h4>
            <span className="text-xs font-bold text-blue-600">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    {/* ✉️ ADMINISTRATIVE ALERTS - Updated to White Theme */}
<section className="py-24 px-6 md:px-12 bg-white">
  <div className="max-w-5xl mx-auto bg-slate-50 p-10 md:p-14 rounded-[32px] text-center flex flex-col gap-4 border border-slate-100 shadow-sm relative overflow-hidden">
    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
      Subscribe for Administrative Core Alerts
    </h2>
    <p className="text-slate-600 text-sm font-medium max-w-xl mx-auto leading-relaxed">
      Stay updated with structural patch notes, laboratory data framework security protocols updates, and cloud transaction backups.
    </p>
    <form className="flex flex-col sm:flex-row gap-3 max-w-md w-full mx-auto mt-4" onSubmit={(e) => e.preventDefault()}>
      <div className="relative flex-1 w-full">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="email" 
          placeholder="Enter administrative email..." 
          required 
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-400" 
        />
      </div>
      <button type="submit" className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl whitespace-nowrap transition-colors duration-200">
        Subscribe Now
      </button>
    </form>
  </div>
</section>

      {/* 📞 INDUSTRIAL FOOTER */}
      <footer className="bg-[#050814] text-white text-sm border-t border-slate-900 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-slate-900/40">
          <div className="max-w-sm flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <FlaskConical className="text-blue-500" size={20} />
              <span className="text-base font-extrabold text-white tracking-tight">CareScynify</span>
            </div>
            <p className="text-xs text-white font-medium leading-relaxed">Architecting secure and optimized automated system modules for medical laboratory analytics data management tracks.</p>
          </div>
          <div className="flex flex-col gap-3.5">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest ">Contact Coordinates</h4>
            <p className="flex items-center gap-2.5 text-xs font-semibold text-white"><Phone size={14} className=" text-white" /> <span>+92 300 1234567</span></p>
            <p className="flex items-center gap-2.5 text-xs font-semibold text-white"><Mail size={14} className=" text-white" /> <span>support@carescynify.com</span></p>
            <p className="flex items-center gap-2.5 text-xs font-semibold text-white"><MapPin size={14} className= "text-white" /> <span>Wazirabd, Punjab, Pakistan</span></p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center pt-8 text-xs font-semibold text-white">
          <p>© 2026 CareScynify Diagnostics Ltd. | Secure System Ecosystem designed with ❤️</p>
        </div>
      </footer>
    </div>
  );
}