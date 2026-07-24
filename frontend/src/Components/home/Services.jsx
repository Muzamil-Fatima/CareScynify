// Services.jsx
import { Link } from "react-router-dom";
import { Stethoscope, FlaskConical, Pill, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    tag: "01 — Doctor Consultations",
    title: "Talk to a doctor today, in person or on video.",
    desc: "Search by specialty, city, or availability. See real profiles, ratings, and consultation fees before you book.",
    points: ["Instant & scheduled video consults", "In-clinic appointment booking", "Digital prescriptions saved to your profile"],
    icon: Stethoscope,
    to: "/doctor",
    cta: "Browse Doctors",
    accent: "bg-[#14534B]",
  },
  {
    tag: "02 — Laboratory",
    title: "Lab tests, from sample pickup to digital report.",
    desc: "Partnered with accredited labs across the city. Book a test, get a technician at your door, and read results online.",
    points: ["Home sample collection", "Reports delivered as trackable PDFs", "Compare test packages & pricing"],
    icon: FlaskConical,
    to: "/laboratory",
    cta: "Book a Test",
    accent: "bg-[#0B2B27]",
  },
  {
    tag: "03 — Pharmacy",
    title: "Medicines delivered, prescriptions handled for you.",
    desc: "Upload a prescription or order directly. Genuine medicines, dosage reminders, and delivery you can track live.",
    points: ["Prescription upload & verification", "Same-day delivery in most areas", "Auto-refill for regular medicines"],
    icon: Pill,
    to: "/pharmacy",
    cta: "Order Medicines",
    accent: "bg-[#E8A33D]",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-xl mb-16">
          <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#14534B]">
            What Caresynify covers
          </span>
          <h2 className="mt-3 font-['Fraunces'] text-3xl md:text-4xl text-[#0B2B27]">
            Three services. One continuous record.
          </h2>
        </div>

        <div className="space-y-6">
          {SERVICES.map(({ tag, title, desc, points, icon: Icon, to, cta, accent }) => (
            <div
              key={tag}
              className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-center border border-[#D8E6E1] rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow"
            >
              <span className={`flex items-center justify-center w-16 h-16 rounded-2xl ${accent} text-white shrink-0`}>
                <Icon className="w-7 h-7" strokeWidth={1.8} />
              </span>

              <div>
                <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#5B7770] mb-2">
                  {tag}
                </p>
                <h3 className="font-['Fraunces'] text-2xl text-[#0B2B27] mb-2">{title}</h3>
                <p className="text-[#3A5650] mb-4 max-w-lg">{desc}</p>
                <ul className="grid sm:grid-cols-3 gap-2 text-sm text-[#3A5650]">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#14534B] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={to}
                className="group inline-flex items-center gap-1.5 justify-center whitespace-nowrap font-medium text-[#0B2B27] border border-[#0B2B27]/20 px-6 py-3 rounded-full hover:bg-[#0B2B27] hover:text-white transition-colors"
              >
                {cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
