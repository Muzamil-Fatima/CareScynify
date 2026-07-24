// Footer.jsx
import { Link } from "react-router-dom";
import { Activity, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B2B27] text-[#8FB3AA] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-[#1F5C53]">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14534B]">
                <Activity className="w-4 h-4 text-[#EAF3EF]" strokeWidth={2.4} />
              </span>
              <span className="font-['Fraunces'] text-lg text-[#EAF3EF]">Caresynify</span>
            </Link>
            <p className="text-sm max-w-xs">
              Doctors, labs, and pharmacy — connected in one health platform.
            </p>
          </div>

          <div>
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#EAF3EF] mb-4">
              Platform
            </p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/doctor" className="hover:text-[#EAF3EF]">Find a Doctor</Link></li>
              <li><Link to="/laboratory" className="hover:text-[#EAF3EF]">Lab Tests</Link></li>
              <li><Link to="/pharmacy" className="hover:text-[#EAF3EF]">Pharmacy</Link></li>
              <li><Link to="/symptom-analyzer" className="hover:text-[#EAF3EF]">Symptom Analyzer</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#EAF3EF] mb-4">
              Company
            </p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-[#EAF3EF]">About Us</Link></li>
              <li><Link to="/role-selection" className="hover:text-[#EAF3EF]">Join as a Doctor</Link></li>
              <li><Link to="/login" className="hover:text-[#EAF3EF]">Log in</Link></li>
              <li><Link to="/signup" className="hover:text-[#EAF3EF]">Sign up</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#EAF3EF] mb-4">
              Follow
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="hover:text-[#EAF3EF]"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-[#EAF3EF]"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-[#EAF3EF]"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <p className="pt-8 text-xs text-center text-[#5B7770]">
          © {new Date().getFullYear()} Caresynify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
