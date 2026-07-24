// CTA.jsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#EAF3EF] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <h2 className="font-['Fraunces'] text-3xl md:text-5xl text-[#0B2B27] leading-tight">
          Your health record shouldn't
          <br />
          live in three different apps.
        </h2>
        <p className="mt-5 text-[#3A5650] max-w-md mx-auto">
          Create your Caresynify profile once — doctors, labs, and pharmacy
          stay connected from there.
        </p>
        <Link
          to="/signup"
          className="mt-8 inline-flex items-center gap-2 bg-[#0B2B27] text-[#EAF3EF] px-8 py-4 rounded-full font-medium hover:bg-[#14534B] transition-colors"
        >
          Create Your Profile
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
