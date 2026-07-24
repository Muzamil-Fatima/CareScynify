// Specializations.jsx
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Eye,
  Stethoscope,
  Ear,
  Smile,
  Venus,
  Pill,
  Activity,
  Wind,
} from "lucide-react";

const SPECIALIZATIONS = [
  { name: "Cardiology", icon: HeartPulse },
  { name: "Neurology", icon: Brain },
  { name: "Orthopedics", icon: Bone },
  { name: "Pediatrics", icon: Baby },
  { name: "Ophthalmology", icon: Eye },
  { name: "General Physician", icon: Stethoscope },
  { name: "ENT Specialist", icon: Ear },
  { name: "Dental Care", icon: Smile },
  { name: "Gynecology", icon: Venus },
  { name: "Psychiatry", icon: Activity },
  { name: "Pulmonology", icon: Wind },
  { name: "Pharmacology", icon: Pill },
];

export default function Specializations() {
  return (
    <section className="bg-[#F5F9F7] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-xl mb-14">
          <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#14534B]">
            Specializations
          </span>
          <h2 className="mt-3 font-['Fraunces'] text-3xl md:text-4xl text-[#0B2B27]">
            Every specialty, one search away.
          </h2>
          <p className="mt-4 text-[#3A5650]">
            From routine check-ups to specialist care — find the right doctor
            for exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPECIALIZATIONS.map(({ name, icon: Icon }) => (
            <Link
              key={name}
              to={`/doctor?specialization=${encodeURIComponent(name)}`}
              className="group flex items-center gap-4 bg-white border border-[#D8E6E1] rounded-2xl p-5 hover:border-[#14534B] hover:shadow-md transition-all"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#EAF3EF] text-[#14534B] group-hover:bg-[#14534B] group-hover:text-[#EAF3EF] transition-colors">
                <Icon className="w-5 h-5" strokeWidth={2} />
              </span>
              <span className="font-medium text-[#0B2B27] text-sm">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
