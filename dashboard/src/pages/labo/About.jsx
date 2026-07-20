import React from "react";
import { FaRegLightbulb, FaUsers, FaFlask, FaShieldAlt } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-100 rounded-full blur-[120px] opacity-50 z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs border-b-2 border-blue-600 pb-1">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
            Redefining <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Diagnostics</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            We merge medical expertise with high-frequency digital workflows to ensure results that you can trust, delivered at the speed of modern life.
          </p>
        </div>

        {/* Features Grid - Glassmorphism Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: FaRegLightbulb, title: "Smart Integration", desc: "AI-driven analysis for unmatched precision in reporting." },
            { icon: FaUsers, title: "Elite Specialists", desc: "A team of pathologists and technicians dedicated to your care." },
            { icon: FaShieldAlt, title: "Certified Safety", desc: "ISO-accredited standards ensure complete data security." }
          ].map((item, index) => (
            <div key={index} className="group p-8 bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <item.icon className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission & History - Modern Split Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900">Empowering <br />Health Outcomes</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Our mission is to eliminate the complexity of diagnostic services. By automating the journey from sample to report, we give clinicians more time to focus on what matters most: <b>the patient.</b>
            </p>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors">
              Explore Our Lab
            </button>
          </div>

          <div className="bg-slate-900 p-10 rounded-4xl text-white shadow-2xl relative">
            <h3 className="text-blue-400 font-bold mb-8 uppercase tracking-widest text-xs">Our Milestone Timeline</h3>
            <div className="space-y-8">
              {[
                { year: "2015", event: "Smart Laboratory established with a vision for digital health." },
                { year: "2020", event: "Scaling diagnostics to serve over 100+ specialized tests." },
                { year: "2026", event: "Pioneering AI-integrated reports for faster patient insights." }
              ].map((milestone, i) => (
                <div key={i} className="flex gap-6 border-b border-white/10 pb-6 last:border-none">
                  <span className="font-black text-2xl text-white/30">{milestone.year}</span>
                  <p className="text-slate-300 text-sm">{milestone.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}