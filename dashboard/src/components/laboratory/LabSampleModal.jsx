import React, { useState, useMemo, useRef, useEffect } from "react";
import { X } from "lucide-react";
import useLabSample from "../../hooks/laboratory/useLabSamples";
import usePatients from "../../hooks/laboratory/useLabAddPatients";

const getPatientName = (p) => {
  if (typeof p?.name === "string" && p.name.trim()) return p.name;
  return "Unnamed Patient";
};

const getPatientCode = (p) => p?.patientId?.patientCode || "";
const getPatientObjectId = (p) => p?.patientId?._id || p?.patientId || "";

export default function LabSampleModal({ closeModal }) {
  const { addLabSample } = useLabSample();
  const { patients } = usePatients();

  const [formData, setFormData] = useState({
    patientId: "", // will store the real ObjectId (Patient._id)
    patientName: "",
    tests: [{ testName: "" }],
    priority: "Normal",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return (patients || []).filter((p) => {
      const nameMatch = getPatientName(p).toLowerCase().includes(term);
      const codeMatch = getPatientCode(p).toLowerCase().includes(term);
      return nameMatch || codeMatch;
    });
  }, [patients, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFormData({
      ...formData,
      patientName: e.target.value,
      patientId: "", // clear selection when typing manually
    });
    setShowDropdown(true);
  };

  const handleSelectPatient = (patient) => {
    setFormData({
      ...formData,
      patientId: getPatientObjectId(patient), // real ObjectId for backend
      patientName: getPatientName(patient),
    });
    setSearchTerm(getPatientName(patient));
    setShowDropdown(false);
  };

  const handleTestChange = (value) => {
    setFormData({
      ...formData,
      tests: [{ testName: value }],
    });
  };

  const handlePriorityChange = (e) => {
    setFormData({
      ...formData,
      priority: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patientId) {
      alert("Please select a valid patient from the list.");
      return;
    }

    await addLabSample(formData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Create New Sample</h2>

          <button onClick={closeModal}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative" ref={wrapperRef}>
            <label className="text-sm font-medium">Patient (Name or ID)</label>

            <input
              name="patientSearch"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
              className="w-full border rounded-xl px-4 py-3 mt-1"
              placeholder="Search by patient name or code (e.g. PT2600001)..."
              autoComplete="off"
              required
            />

            {showDropdown && filteredPatients.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-xl mt-1 max-h-48 overflow-y-auto shadow-lg">
                {filteredPatients.map((p) => (
                  <button
                    type="button"
                    key={p._id}
                    onClick={() => handleSelectPatient(p)}
                    className="w-full text-left px-4 py-2 hover:bg-purple-50 flex justify-between items-center"
                  >
                    <span>{getPatientName(p)}</span>
                    <span className="text-xs text-gray-400">
                      ID: {getPatientCode(p) || "N/A"}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {showDropdown && searchTerm && filteredPatients.length === 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-xl mt-1 px-4 py-2 text-sm text-gray-400 shadow-lg">
                No matching patient found
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Test Name</label>

            <input
              value={formData.tests[0].testName}
              onChange={(e) => handleTestChange(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1"
              placeholder="CBC, Glucose..."
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handlePriorityChange}
              className="w-full border rounded-xl px-4 py-3 mt-1"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
          >
            Create Sample
          </button>
        </form>
      </div>
    </div>
  );
}
