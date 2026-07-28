// Specializations.jsx
import { Link } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HearingIcon from "@mui/icons-material/Hearing";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import FemaleIcon from "@mui/icons-material/Female";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import AirIcon from "@mui/icons-material/Air";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

const SPECIALIZATIONS = [
  { name: "Cardiology", icon: FavoriteIcon },
  { name: "Neurology", icon: PsychologyIcon },
  { name: "Orthopedics", icon: AccessibilityNewIcon },
  { name: "Pediatrics", icon: ChildCareIcon },
  { name: "Ophthalmology", icon: VisibilityIcon },
  { name: "General Physician", icon: MedicalServicesIcon },
  { name: "ENT Specialist", icon: HearingIcon },
  { name: "Dental Care", icon: SentimentSatisfiedAltIcon },
  { name: "Gynecology", icon: FemaleIcon },
  { name: "Psychiatry", icon: PsychologyAltIcon },
  { name: "Pulmonology", icon: AirIcon },
  { name: "Pharmacology", icon: LocalPharmacyIcon },
];

export default function Specializations() {
  return (
    <section className="bg-linear-to-b from-purple-50 to-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="max-w-xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            Specializations
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Every specialty, one search away.
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            From routine check-ups to specialist care — find the right doctor
            for exactly what you need.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {SPECIALIZATIONS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={`/doctor?specialization=${encodeURIComponent(item.name)}`}
                className="group flex items-center gap-4 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:bg-linear-to-r group-hover:from-purple-500 group-hover:via-violet-500 group-hover:to-indigo-500 group-hover:text-white transition-all duration-300">
                  <Icon sx={{ fontSize: 22 }} />
                </div>

                <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
