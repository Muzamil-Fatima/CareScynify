// Hero.jsx
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[#EAF3EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-14 items-center">
        {/* Left: copy */}
        <div>
          <span className="inline-block font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#14534B] bg-white border border-[#D8E6E1] px-3 py-1 rounded-full mb-6">
            Doctors · Labs · Pharmacy — one platform
          </span>

          <h1 className="font-['Fraunces'] text-4xl md:text-6xl leading-[1.05] text-[#0B2B27]">
            Care that reads
            <br />
            your <span className="italic text-[#14534B]">vitals</span>,
            <br />
            not just your file.
          </h1>

          <p className="mt-6 text-lg text-[#3A5650] max-w-md">
            Book a doctor, order lab tests, and get medicines delivered — all
            tracked in one place, so nothing about your health gets lost in
            the gaps.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/doctor"
              className="group inline-flex items-center gap-2 bg-[#0B2B27] text-[#EAF3EF] px-7 py-3.5 rounded-full font-medium hover:bg-[#14534B] transition-colors"
            >
              Find a Doctor
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/symptom-analyzer"
              className="inline-flex items-center gap-2 text-[#0B2B27] px-7 py-3.5 rounded-full font-medium border border-[#0B2B27]/20 hover:border-[#0B2B27] transition-colors"
            >
              Check Symptoms
            </Link>
          </div>

          {/* Trust row - monospace, like reading a data readout */}
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 font-['IBM_Plex_Mono']">
            <div>
              <p className="text-2xl text-[#0B2B27]">2,400+</p>
              <p className="text-xs uppercase tracking-wide text-[#5B7770]">Verified Doctors</p>
            </div>
            <div>
              <p className="text-2xl text-[#0B2B27]">180+</p>
              <p className="text-xs uppercase tracking-wide text-[#5B7770]">Partner Labs</p>
            </div>
            <div>
              <p className="text-2xl text-[#0B2B27]">45 min</p>
              <p className="text-xs uppercase tracking-wide text-[#5B7770]">Avg. Delivery</p>
            </div>
          </div>
        </div>

        {/* Right: layered "vitals card" mockup */}
        <div className="relative h-[420px] hidden md:block">
          <div className="absolute right-6 top-2 w-72 bg-white rounded-2xl shadow-xl border border-[#D8E6E1] p-6 rotate-3">
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#5B7770]">
              Appointment Confirmed
            </p>
            <p className="mt-2 font-['Fraunces'] text-xl text-[#0B2B27]">
              Dr. Amina Raza
            </p>
            <p className="text-sm text-[#5B7770]">Cardiology · Today, 4:30 PM</p>
            <div className="mt-4 flex items-center gap-2 text-[#14534B] text-sm">
              <CheckCircle2 className="w-4 h-4" /> Video consult ready
            </div>
          </div>

          <div className="absolute left-0 bottom-4 w-64 bg-[#0B2B27] text-[#EAF3EF] rounded-2xl shadow-xl p-6 -rotate-6">
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-[#8FB3AA]">
              Lab Report
            </p>
            <p className="mt-2 font-['Fraunces'] text-xl">CBC Panel</p>
            <p className="text-sm text-[#8FB3AA]">All markers within range</p>
            <div className="mt-4 h-10">
              <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M0 20 L40 20 L55 6 L70 34 L85 14 L100 26 L115 20 L200 20"
                  fill="none"
                  stroke="#E8A33D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
