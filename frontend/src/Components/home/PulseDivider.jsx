// PulseDivider.jsx
// Signature element: a continuous "vitals line" used between sections instead of a plain hairline.
// Ties every section back to the health/monitoring subject without being a literal heart icon.

export default function PulseDivider({ flip = false, tone = "light" }) {
  const stroke = tone === "light" ? "#D8E6E1" : "#1F5C53";

  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-10"
      >
        <path
          d="M0 20 H420 L450 20 L465 4 L482 36 L498 12 L512 28 L528 20 H1200"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
