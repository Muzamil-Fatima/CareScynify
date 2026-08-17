
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-purple-50 py-16 sm:py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
        Your health record shouldn't live in three different apps.
        </h2>

        <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Create your CareScynify profile once — doctors, labs, and pharmacy
          stay connected from there.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg"
        >
          Create Your Profile
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}