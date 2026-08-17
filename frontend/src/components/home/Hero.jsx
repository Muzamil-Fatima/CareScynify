import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-linear-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-20 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left: copy */}
        <div>
          <span className="inline-block max-w-full font-['IBM_Plex_Mono'] text-[10px] sm:text-xs tracking-widest uppercase text-purple-700 bg-white border border-purple-200 px-3 py-1 rounded-full mb-5 sm:mb-6">
            Doctors · Labs · Pharmacy — one platform
          </span>

          <h1 className="font-['Fraunces'] text-3xl sm:text-4xl md:text-6xl leading-[1.08] text-gray-900">
            Care that reads your{" "}
            <span className="italic bg-linear-to-r from-purple-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
              vitals
            </span>
            , not just your file.
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-md leading-7">
            Book a doctor, order lab tests, and get medicines delivered — all
            tracked in one place, so nothing about your health gets lost in the
            gaps.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/doctor"
              className="group inline-flex items-center gap-2 bg-linear-to-r from-purple-500 via-violet-500 to-indigo-500 text-white px-7 py-3.5 rounded-full font-medium hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Find a Doctor
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/symptom-analyzer"
              className="inline-flex items-center gap-2 text-purple-700 px-7 py-3.5 rounded-full font-medium border border-purple-200 bg-white hover:bg-purple-50 hover:border-purple-400 transition-all"
            >
              Check Symptoms
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-10 sm:mt-12 flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-4 font-['IBM_Plex_Mono']">
            <div>
              <p className="text-2xl text-gray-900">2,400+</p>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Verified Doctors
              </p>
            </div>

            <div>
              <p className="text-2xl text-gray-900">180+</p>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Partner Labs
              </p>
            </div>

            <div>
              <p className="text-2xl text-gray-900">45 min</p>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Avg. Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Right: layered cards */}
        <div className="relative h-[420px] hidden md:block">
          {/* Appointment Card */}
          <div className="absolute right-6 top-2 w-72 bg-white rounded-2xl shadow-xl border border-purple-100 p-6 rotate-3">
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-gray-500">
              Appointment Confirmed
            </p>

            <p className="mt-2 font-['Fraunces'] text-xl text-gray-900">
              Dr. Amina Raza
            </p>

            <p className="text-sm text-gray-500">Cardiology · Today, 4:30 PM</p>

            <div className="mt-4 flex items-center gap-2 text-purple-600 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Video consult ready
            </div>
          </div>

          {/* Lab Card */}
          <div className="absolute left-0 bottom-4 w-64 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-600 text-white rounded-2xl shadow-xl p-6 -rotate-6">
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide text-purple-100">
              Lab Report
            </p>

            <p className="mt-2 font-['Fraunces'] text-xl">CBC Panel</p>

            <p className="text-sm text-purple-100">All markers within range</p>

            <div className="mt-4 h-10">
              <svg
                viewBox="0 0 200 40"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 20 L40 20 L55 6 L70 34 L85 14 L100 26 L115 20 L200 20"
                  fill="none"
                  stroke="#FDE68A"
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
