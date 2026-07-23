import React, { useMemo, useState } from "react";

const specializations = [
  "Allergist",
  "Anesthesiologist",
  "Audiologist",
  "Cardiologist",
  "Cardiothoracic Surgeon",
  "Dentist",
  "Dermatologist",
  "Emergency Medicine",
  "Endocrinologist",
  "ENT Specialist",
  "Family Medicine",
  "Gastroenterologist",
  "General Physician",
  "General Surgeon",
  "Gynecologist",
  "Hematologist",
  "Hepatologist",
  "Immunologist",
  "Infectious Disease Specialist",
  "Internal Medicine",
  "Nephrologist",
  "Neurologist",
  "Neurosurgeon",
  "Obstetrician",
  "Oncologist",
  "Ophthalmologist",
  "Orthopedic Surgeon",
  "Pain Specialist",
  "Pathologist",
  "Pediatrician",
  "Plastic Surgeon",
  "Psychiatrist",
  "Psychologist",
  "Pulmonologist",
  "Radiologist",
  "Rheumatologist",
  "Sports Medicine",
  "Urologist",
  "Vascular Surgeon",
];

const DrSpecialization = ({ value, onChange }) => {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return specializations;

    return specializations.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        placeholder="Search specialization..."
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange("");
          setOpen(true);
        }}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
      />

      {open && (
        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item);
                  onChange(item);
                  setOpen(false);
                }}
                className="block w-full px-4 py-3 text-left hover:bg-purple-50"
              >
                {item}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">
              No specialization found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrSpecialization;