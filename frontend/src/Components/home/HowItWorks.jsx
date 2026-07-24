// HowItWorks.jsx
// Numbered steps are appropriate here — this is a real, ordered process.

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
    <section className="bg-[#0B2B27] py-20 md:py-28 text-[#EAF3EF]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#8FB3AA]">
          How it works
        </span>
        <h2 className="mt-3 font-['Fraunces'] text-3xl md:text-4xl mb-16 max-w-lg">
          Three steps between you and care.
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative">
              <p className="font-['IBM_Plex_Mono'] text-5xl text-[#1F5C53]">{step.n}</p>
              <h3 className="mt-4 font-['Fraunces'] text-2xl">{step.title}</h3>
              <p className="mt-3 text-[#8FB3AA] max-w-xs">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-4 w-8 h-px bg-[#1F5C53]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
