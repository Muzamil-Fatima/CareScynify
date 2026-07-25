import { Link } from "react-router-dom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ScienceIcon from "@mui/icons-material/Science";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const SERVICES = [
  {
    tag: "01 — Doctor Consultations",
    title: "Talk to a doctor today, in person or on video.",
    desc: "Search by specialty, city, or availability. See real profiles, ratings, and consultation fees before you book.",
    points: [
      "Instant & scheduled video consults",
      "In-clinic appointment booking",
      "Digital prescriptions saved to your profile",
    ],
    icon: MedicalServicesIcon,
    to: "/doctor",
    cta: "Browse Doctors",
    accent:
      "bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500",
  },
  {
    tag: "02 — Laboratory",
    title: "Lab tests, from sample pickup to digital report.",
    desc: "Partnered with accredited labs across the city. Book a test, get a technician at your door, and read results online.",
    points: [
      "Home sample collection",
      "Reports delivered as trackable PDFs",
      "Compare test packages & pricing",
    ],
    icon: ScienceIcon,
    to: "/laboratory",
    cta: "Book a Test",
    accent:
      "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    tag: "03 — Pharmacy",
    title: "Medicines delivered, prescriptions handled for you.",
    desc: "Upload a prescription or order directly. Genuine medicines, dosage reminders, and delivery you can track live.",
    points: [
      "Prescription upload & verification",
      "Same-day delivery in most areas",
      "Auto-refill for regular medicines",
    ],
    icon: LocalPharmacyIcon,
    to: "/medicine",
    cta: "Order Medicines",
    accent:
      "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
  },
];

export default function Services() {
  return (
    <section className="bg-linear-to-b from-white to-purple-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="max-w-xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            What CareScynify Covers
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Three services. One continuous record.
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Everything you need for your healthcare journey — consultations,
            lab testing, and medicine delivery in one place.
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.tag}
                className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-center rounded-3xl border border-purple-100 bg-white p-8 md:p-10 shadow-sm hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${service.accent}`}
                >
                  <Icon sx={{ fontSize: 34 }} />
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-2">
                    {service.tag}
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-7 mb-5">
                    {service.desc}
                  </p>

                  <ul className="grid sm:grid-cols-3 gap-3">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  to={service.to}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-6 py-3 font-medium text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300"
                >
                  {service.cta}
                  <ArrowOutwardIcon
                    fontSize="small"
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}