
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-purple-50 py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Your health record shouldn't
          <br />
          live in three different apps.
        </h2>

        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          Create your CareScynify profile once — doctors, labs, and pharmacy
          stay connected from there.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg"
        >
          Create Your Profile
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}