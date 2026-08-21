
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Sara Khan",
    role: "Patient · Lahore",
    text: "Booked a dermatologist and got my lab test done the same week — all through one app. The report was up online before I even got home.",
  },
  {
    name: "Bilal Ahmed",
    role: "Patient · Gujranwala",
    text: "Ordered my father's monthly medicines with auto-refill. No more running to the pharmacy every few weeks.",
  },
  {
    name: "Dr. Hina Malik",
    role: "Cardiologist, Partner",
    text: "My schedule, patient history, and follow-ups are finally in one place instead of three different tools.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-linear-to-b from-purple-50 to-white py-16 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-600">
          Trusted by patients & doctors
        </span>

        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-10 sm:mb-14 max-w-lg">
          What people are saying.
        </h2>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-white border border-purple-100 rounded-2xl p-5 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 text-amber-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-7 mb-6">
                "{r.text}"
              </p>

              <p className="font-semibold text-gray-900">
                {r.name}
              </p>

              <p className="text-sm text-gray-500">
                {r.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}