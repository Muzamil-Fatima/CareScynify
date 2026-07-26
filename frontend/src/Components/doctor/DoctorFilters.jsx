// import React, { useState } from "react";
// import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

// const DoctorFilters = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     specialty: "",
//     experience: "",
//     fee: "",
//     rating: "",
//     available: false,
//   });

//   const handleChange = (key, value) => {
//     const updated = { ...filters, [key]: value };
//     setFilters(updated);
//     onFilterChange?.(updated);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      
//       {/* Header */}
//       <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//         <FilterAltOutlinedIcon fontSize="small" />
//         Filters
//       </h2>

//       {/* Specialty */}
//       <div>
//         <label className="text-sm text-gray-600">Specialty</label>
//         <select
//           className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//           onChange={(e) => handleChange("specialty", e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Cardiologist">Cardiologist</option>
//           <option value="Dermatologist">Dermatologist</option>
//           <option value="ENT">ENT</option>
//           <option value="Neurologist">Neurologist</option>
//         </select>
//       </div>

//       {/* Experience */}
//       <div>
//         <label className="text-sm text-gray-600">Experience</label>
//         <select
//           className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//           onChange={(e) => handleChange("experience", e.target.value)}
//         >
//           <option value="">Any</option>
//           <option value="5+">5+ Years</option>
//           <option value="10+">10+ Years</option>
//           <option value="15+">15+ Years</option>
//         </select>
//       </div>

//       {/* Fee */}
//       <div>
//         <label className="text-sm text-gray-600">Consultation Fee</label>
//         <select
//           className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//           onChange={(e) => handleChange("fee", e.target.value)}
//         >
//           <option value="">Any</option>
//           <option value="low">Under 1000</option>
//           <option value="mid">1000 - 3000</option>
//           <option value="high">3000+</option>
//         </select>
//       </div>

//       {/* Rating */}
//       <div>
//         <label className="text-sm text-gray-600 flex items-center gap-1">
//           <StarOutlinedIcon fontSize="small" />
//           Rating
//         </label>

//         <select
//           className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
//           onChange={(e) => handleChange("rating", e.target.value)}
//         >
//           <option value="">Any</option>
//           <option value="4">4+ Stars</option>
//           <option value="4.5">4.5+ Stars</option>
//         </select>
//       </div>

//       {/* Availability */}
//       <div className="flex items-center justify-between pt-2">
//         <span className="text-sm text-gray-600">Available Today</span>

//         <input
//           type="checkbox"
//           className="w-4 h-4 accent-purple-600"
//           onChange={(e) => handleChange("available", e.target.checked)}
//         />
//       </div>

//       {/* Reset */}
//       <button
//         onClick={() => {
//           const reset = {
//             specialty: "",
//             experience: "",
//             fee: "",
//             rating: "",
//             available: false,
//           };
//           setFilters(reset);
//           onFilterChange?.(reset);
//         }}
//         className="w-full mt-3 text-sm text-purple-700 hover:text-purple-900 transition"
//       >
//         Reset Filters
//       </button>
//     </div>
//   );
// };

// export default DoctorFilters;
import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import Switch from "@mui/material/Switch";

const initialFilters = {
  specialty: "",
  experience: "",
  fee: "",
  rating: "",
  available: false,
};

const DoctorFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (key, value) => {
    const updated = {
      ...filters,
      [key]: value,
    };

    setFilters(updated);
    onFilterChange?.(updated);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange?.(initialFilters);
  };

  const hasActiveFilters =
    filters.specialty ||
    filters.experience ||
    filters.fee ||
    filters.rating ||
    filters.available;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <FilterAltOutlinedIcon className="text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Filters
        </h2>
      </div>

      {/* Specialty */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Specialty
        </label>

        <div className="relative">
          <SearchOutlinedIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />

          <input
            list="specialties"
            value={filters.specialty}
            onChange={(e) =>
              handleChange("specialty", e.target.value)
            }
            placeholder="Search specialty..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

          <datalist id="specialties">
            <option value="Cardiologist" />
            <option value="Dermatologist" />
            <option value="Neurologist" />
            <option value="ENT" />
            <option value="Orthopedic" />
            <option value="Pediatrician" />
            <option value="Dentist" />
            <option value="Psychiatrist" />
          </datalist>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Experience
        </label>

        <select
          value={filters.experience}
          onChange={(e) =>
            handleChange("experience", e.target.value)
          }
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">Any Experience</option>
          <option value="1">1+ Years</option>
          <option value="5">5+ Years</option>
          <option value="10">10+ Years</option>
          <option value="15">15+ Years</option>
        </select>
      </div>

      {/* Consultation Fee */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Consultation Fee
        </label>

        <select
          value={filters.fee}
          onChange={(e) =>
            handleChange("fee", e.target.value)
          }
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">Any Fee</option>
          <option value="low">Under 1000</option>
          <option value="mid">1000 - 3000</option>
          <option value="high">3000+</option>
        </select>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <label className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700">
          <StarOutlinedIcon
            fontSize="small"
            className="text-yellow-500"
          />
          Rating
        </label>

        <select
          value={filters.rating}
          onChange={(e) =>
            handleChange("rating", e.target.value)
          }
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">Any Rating</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      {/* Available Today */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">
            Available Today
          </p>
          <p className="text-xs text-gray-500">
            Show only available doctors
          </p>
        </div>

        <Switch
          checked={filters.available}
          onChange={(e) =>
            handleChange("available", e.target.checked)
          }
          color="secondary"
        />
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        disabled={!hasActiveFilters}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all ${
          hasActiveFilters
            ? "border border-purple-200 text-purple-700 hover:bg-purple-50"
            : "cursor-not-allowed border border-gray-200 text-gray-400"
        }`}
      >
        <RestartAltOutlinedIcon fontSize="small" />
        Reset Filters
      </button>
    </div>
  );
};

export default DoctorFilters;