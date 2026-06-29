import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaSearch,
  FaExchangeAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PharmacyMedicines = () => {
  // Global display currency state ('PKR' ya 'USD')
  const [displayCurrency, setDisplayCurrency] = useState("PKR");
  // Conversion Rate: 1 USD = 280 PKR (Hum default fix rakh rahe hain prototype ke liye)
  const exchangeRate = 280;

  // Initial Mock Data (Is mein humne currency aur location dono fields daal di hain)
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Panadol 500mg",
      category: "Tablet",
      price: 60,
      currency: "PKR",
      quantity: 120,
      expiry: "2026-12-15",
      location: "Rack A - Shelf 2",
    },
    {
      id: 2,
      name: "Amoxicillin Cap",
      category: "Capsule",
      price: 15,
      currency: "USD",
      quantity: 45,
      expiry: "2026-08-20",
      location: "Rack B - Shelf 1",
    },
    {
      id: 3,
      name: "Lipitor 10mg",
      category: "Tablet",
      price: 4.5,
      currency: "USD",
      quantity: 80,
      expiry: "2024-05-10",
      location: "Rack C - Shelf 4",
    }, // Expired for testing
  ]);

  // Form States for adding new medicine
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Tablet");
  const [newPrice, setNewPrice] = useState("");
  const [newCurrency, setNewCurrency] = useState("PKR"); // Nayi medicine ki apni currency
  const [newQuantity, setNewQuantity] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [newLocation, setNewLocation] = useState(""); // Nayi medicine ki shelf location
  const [searchQuery, setSearchQuery] = useState("");

  // Function: Price Converter (Jo display ke waqt automatic convert karega)
  const formatPrice = (price, medCurrency) => {
    if (displayCurrency === "PKR") {
      // Agar medicine USD mein hai aur display PKR karna hai
      if (medCurrency === "USD") {
        return `Rs. ${(price * exchangeRate).toLocaleString()}`;
      }
      return `Rs. ${price.toLocaleString()}`;
    } else {
      // Agar display USD mein karna hai aur medicine PKR mein hai
      if (medCurrency === "PKR") {
        return `$${(price / exchangeRate).toFixed(2)}`;
      }
      return `$${price.toFixed(2)}`;
    }
  };

  // Add Medicine Handler
  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!newName || !newPrice || !newQuantity || !newExpiry || !newLocation) {
      alert("Kindly fill all fields including Location!");
      return;
    }

    const newMed = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      price: parseFloat(newPrice),
      currency: newCurrency,
      quantity: parseInt(newQuantity),
      expiry: newExpiry,
      location: newLocation,
    };

    setMedicines([newMed, ...medicines]);

    // Clear Input Fields
    setNewName("");
    setNewPrice("");
    setNewQuantity("");
    setNewExpiry("");
    setNewLocation("");
  };

  // Delete Handler
  const handleDelete = (id) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  // Filtered Search
  const filteredMeds = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-8 bg-[#f8f9fe] min-h-screen">
      {/* Header section with Currency Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-950">
            Medicine Inventory
          </h1>
          <p className="text-gray-500 font-medium">
            Manage stock, international currencies, and shelf locations
          </p>
        </div>

        {/* Advanced Currency Switcher Card */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
          <span className="text-sm font-bold text-gray-500 flex items-center gap-1">
            <FaExchangeAlt /> System Currency:
          </span>
          <select
            value={displayCurrency}
            onChange={(e) => setDisplayCurrency(e.target.value)}
            className="bg-blue-50 text-blue-950 font-black px-4 py-2 rounded-xl border-none outline-none cursor-pointer"
          >
            <option value="PKR">PKR (Rs.)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Input Form & Inventory Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form to Add Medicine */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-black text-blue-950 mb-6 flex items-center gap-2">
            <FaPlus className="text-blue-600 text-sm" /> Add New Medicine
          </h2>
          <form onSubmit={handleAddMedicine} className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase">
                Medicine Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl font-medium outline-blue-600"
                placeholder="e.g. Augmentin 625mg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl font-medium outline-blue-600"
                >
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Injection">Injection</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl font-medium outline-blue-600"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Advanced Price Input with Base Currency Selection */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase">
                  Base Price
                </label>
                <input
                  type="number"
                  step="any"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl font-medium outline-blue-600"
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase">
                  Currency
                </label>
                <select
                  value={newCurrency}
                  onChange={(e) => setNewCurrency(e.target.value)}
                  className="w-full mt-1 p-3 bg-blue-50 text-blue-900 font-bold border-none rounded-xl outline-blue-600 cursor-pointer"
                >
                  <option value="PKR">PKR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase flex items-center gap-1">
                <FaMapMarkerAlt className="text-blue-600" /> Shelf Location
              </label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl font-medium outline-blue-600"
                placeholder="e.g. Rack B - Shelf 3"
              />
            </div>

            <div>
              <label className="text-xs font-black text-gray-400 uppercase">
                Expiry Date
              </label>
              <input
                type="date"
                value={newExpiry}
                onChange={(e) => setNewExpiry(e.target.value)}
                className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl font-medium outline-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-950 text-white p-4 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-950/10 mt-2"
            >
              Save to Stock
            </button>
          </form>
        </div>

        {/* Stock List Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <h3 className="font-black text-blue-950 text-lg">Current Stock</h3>
            {/* Search Bar */}
            <div className="relative flex items-center">
              <FaSearch className="absolute left-4 text-gray-400 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl font-medium outline-blue-600 text-sm w-full md:w-64"
                placeholder="Search medicine..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="p-4 pl-8 text-xs font-black text-gray-400 uppercase">
                    Medicine & Location
                  </th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase">
                    Category
                  </th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase">
                    Converted Price
                  </th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase">
                    Qty
                  </th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase">
                    Expiry
                  </th>
                  <th className="p-4 pr-8 text-center text-xs font-black text-gray-400 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredMeds.map((med) => (
                  <tr
                    key={med.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    {/* Name and Shelf Location */}
                    <td className="p-4 pl-8">
                      <div className="font-bold text-gray-800">{med.name}</div>
                      <div className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-0.5">
                        <FaMapMarkerAlt className="text-[10px]" />{" "}
                        {med.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold uppercase">
                        {med.category}
                      </span>
                    </td>
                    {/* Converted Dynamic Price */}
                    <td className="p-4 font-black text-blue-950">
                      {formatPrice(med.price, med.currency)}
                      <span className="text-[10px] text-gray-400 block font-normal">
                        Base: {med.price} {med.currency}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-700">
                      {med.quantity}
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-600">
                        {med.expiry}
                      </span>
                    </td>
                    <td className="p-4 pr-8 text-center">
                      <button
                        onClick={() => handleDelete(med.id)}
                        className="text-red-500 hover:text-red-700 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border-none cursor-pointer mx-auto block"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMeds.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-8 text-gray-400 font-medium"
                    >
                      No medicines found in stock.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyMedicines;