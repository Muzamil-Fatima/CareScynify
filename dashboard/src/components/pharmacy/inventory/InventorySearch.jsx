import React from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

const InventorySearch = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <SearchRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search medicine by name, SKU or manufacturer..."
          className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Category */}
          <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
            <option>All Categories</option>
            <option>Tablet</option>
            <option>Capsule</option>
            <option>Syrup</option>
            <option>Injection</option>
            <option>Cream</option>
            <option>Drops</option>
          </select>

          {/* Stock */}
          <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
            <option>All Stock</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
            <option>Expired</option>
          </select>

          {/* Sort */}
          <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
            <option>Sort By</option>
            <option>Name (A-Z)</option>
            <option>Name (Z-A)</option>
            <option>Newest</option>
            <option>Oldest</option>
            <option>Price (Low-High)</option>
            <option>Price (High-Low)</option>
            <option>Stock</option>
            <option>Expiry Date</option>
          </select>
        </div>

        {/* Right Side */}
        <div className="flex gap-3">
          {/* Filter Button */}
          <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
            <FilterListRoundedIcon fontSize="small" />
            Filters
          </button>

          {/* Add Medicine */}
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
            <AddRoundedIcon fontSize="small" />
            Add Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventorySearch;