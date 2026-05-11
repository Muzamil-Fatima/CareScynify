import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const DoctorSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
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
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search doctors, specialties, hospitals..."
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

export default DoctorSearchBar;