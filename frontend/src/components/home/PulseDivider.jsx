// PulseDivider.jsx

export default function PulseDivider({ flip = false, tone = "light" }) {
  const stroke = tone === "light" ? "#DDD6FE" : "#8B5CF6";
  // light = purple-200
  // dark = purple-500

  return (
    <div
      className={`w-full overflow-hidden leading-none ${
        flip ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-10"
      >
        <path
          d="M0 20 H420 L450 20 L465 4 L482 36 L498 12 L512 28 L528 20 H1200"
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}