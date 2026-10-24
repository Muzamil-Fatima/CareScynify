import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

import { useMedicine } from "../../../../context/pharmacy/MedicineContext";

const InventorySearch = () => {
  const navigate = useNavigate();

  const {
    searchMedicinesList,
    filterMedicines,
    resetMedicineFilters,
  } = useMedicine();

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const [category, setCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  // --------------------------------------------------
  // ADD MEDICINE
  // --------------------------------------------------

  const handleAddMedicine = () => {
    navigate("/pharmacy/add-medicine");
  };

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearch(value);

    try {
      setSearching(true);

      await searchMedicinesList(value);
    } catch (error) {
      console.error(
        "Search medicines error:",
        error
      );
    } finally {
      setSearching(false);
    }
  };

  // --------------------------------------------------
  // CATEGORY
  // --------------------------------------------------

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setCategory(value);

    filterMedicines({
      category: value,
      stock: stockFilter,
      sort: sortBy,
    });
  };

  // --------------------------------------------------
  // STOCK
  // --------------------------------------------------

  const handleStockChange = (e) => {
    const value = e.target.value;

    setStockFilter(value);

    filterMedicines({
      category,
      stock: value,
      sort: sortBy,
    });
  };

  // --------------------------------------------------
  // SORT
  // --------------------------------------------------

  const handleSortChange = (e) => {
    const value = e.target.value;

    setSortBy(value);

    filterMedicines({
      category,
      stock: stockFilter,
      sort: value,
    });
  };

  // --------------------------------------------------
  // RESET
  // --------------------------------------------------

  const handleResetFilters = () => {
    setCategory("");
    setStockFilter("");
    setSortBy("");
    setSearch("");

    resetMedicineFilters();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <SearchRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search medicine by name, SKU or manufacturer..."
          className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-24 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
        />

        {searching && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            Searching...
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Category */}
          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          >
            <option value="">All Categories</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
            <option value="Cream">Cream</option>
            <option value="Drops">Drops</option>
            <option value="Inhaler">Inhaler</option>
            <option value="Ointment">Ointment</option>
            <option value="Powder">Powder</option>
            <option value="Other">Other</option>
          </select>

          {/* Stock */}
          <select
            value={stockFilter}
            onChange={handleStockChange}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          >
            <option value="">All Stock</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">
              Out of Stock
            </option>
            <option value="expired">Expired</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          >
            <option value="">Sort By</option>
            <option value="name-asc">
              Name (A-Z)
            </option>
            <option value="name-desc">
              Name (Z-A)
            </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-low">
              Price (Low-High)
            </option>
            <option value="price-high">
              Price (High-Low)
            </option>
            <option value="stock">Stock</option>
            <option value="expiry">
              Expiry Date
            </option>
          </select>
        </div>

        {/* Right Side */}
        <div className="flex gap-3">
          {/* Reset */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <FilterListRoundedIcon fontSize="small" />
            Reset
          </button>

          {/* Add Medicine */}
          <button
            type="button"
            onClick={handleAddMedicine}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            <AddRoundedIcon fontSize="small" />
            Add Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventorySearch;