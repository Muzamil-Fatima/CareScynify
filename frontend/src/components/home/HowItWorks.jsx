const STEPS = [
  {
    n: "01",
    title: "Search",
    desc: "Tell us your symptom, specialty, or the test you need. We match you with doctors, labs, or medicines nearby.",
  },
  {
    n: "02",
    title: "Book",
    desc: "Pick a time slot, a lab technician visit, or place your pharmacy order — confirmed in seconds.",
  },
  {
    n: "03",
    title: "Get Care",
    desc: "Consult, get tested, or receive your delivery. Everything lands in one health record you can revisit anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-linear-to-br from-purple-50 via-white to-violet-50 py-16 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-purple-600">
          How it works
        </span>

        <h2 className="mt-3 font-['Fraunces'] text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-10 sm:mb-16 max-w-lg">
          Three steps between you and care.
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 "
            >
              <p className="font-['IBM_Plex_Mono'] text-5xl font-bold bg-linear-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {step.n}
              </p>

              <h3 className="mt-5 font-['Fraunces'] text-2xl text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
