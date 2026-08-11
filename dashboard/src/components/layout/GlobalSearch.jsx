import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const GlobalSearch = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div
      className="flex items-center bg-slate-50 border border-purple-100/80 rounded-xl px-3 group focus-within:border-purple-400 focus-within:bg-white transition-all duration-200
        w-48
        md:w-64
        lg:w-80
      "
    >
      <SearchIcon
        fontSize="small"
        className="
          text-slate-400
          group-focus-within:text-purple-600
          transition-colors
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          ml-2
          bg-transparent
          outline-none
          py-2
          text-sm
          text-slate-700
          w-full
          placeholder-slate-400
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            text-slate-400
            hover:text-slate-600
            text-lg
            leading-none
          "
        >
          ×
        </button>
      )}
    </div>
  );
};

export default GlobalSearch;
