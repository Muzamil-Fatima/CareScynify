// Testimonials.jsx
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
    <section className="bg-[#F5F9F7] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#14534B]">
          Trusted by patients & doctors
        </span>
        <h2 className="mt-3 font-['Fraunces'] text-3xl md:text-4xl text-[#0B2B27] mb-14 max-w-lg">
          What people are saying.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white border border-[#D8E6E1] rounded-2xl p-7">
              <div className="flex gap-1 text-[#E8A33D] mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill="#E8A33D" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[#3A5650] mb-6">"{r.text}"</p>
              <p className="font-medium text-[#0B2B27] text-sm">{r.name}</p>
              <p className="text-xs text-[#5B7770]">{r.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
