import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ClinicSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (value) => {
    setQuery(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-3 flex items-center gap-2">

      {/* Search Icon */}
      <SearchOutlinedIcon className="text-gray-400" />

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search clinics, type, location..."
        className="w-full outline-none text-sm text-gray-700"
      />

      {/* Clear Button */}
      {query && (
        <button onClick={clearSearch}>
          <CloseOutlinedIcon className="text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ClinicSearchBar;