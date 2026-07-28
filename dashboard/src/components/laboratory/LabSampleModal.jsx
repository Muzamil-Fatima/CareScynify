import React, { useState, useMemo, useRef, useEffect } from "react";
import { X } from "lucide-react";
import useLabSample from "../../hooks/laboratory/useLabSamples";
import usePatients from "../../hooks/laboratory/useLabAddPatients";
import useLabTests from "../../hooks/laboratory/useLabTests";
const getPatientName = (p) => {
  if (typeof p?.name === "string" && p.name.trim()) return p.name;
  return "Unnamed Patient";
};

const getPatientCode = (p) => p?.patientId?.patientCode || "";

export default function LabSampleModal({ closeModal }) {
  const { addLabSample } = useLabSample();
  const { patients } = usePatients();
  const { testsList, getLabTests } = useLabTests();
  const [testSearch, setTestSearch] = useState("");
  const [showTestDropdown, setShowTestDropdown] = useState(false);

  const testWrapperRef = useRef(null);
  const [formData, setFormData] = useState({
    labPatientId: "", // will store the real ObjectId (Patient._id)
    tests: [{ testName: "" }],
    priority: "Normal",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const filteredTests = useMemo(() => {
    if (!testSearch.trim()) {
      return (testsList || []).slice(0, 5);
    }

    return (testsList || []).filter((test) =>
      test.name.toLowerCase().includes(testSearch.toLowerCase()),
    );
  }, [testsList, testSearch]);
  useEffect(() => {
    getLabTests();
  }, [getLabTests]);
  const handleSelectTest = (test) => {
    setFormData({
      ...formData,
      tests: [
        {
          testId: test._id,
          testName: test.name,
        },
      ],
    });

    setTestSearch(test.name);
    setShowTestDropdown(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }

      if (
        testWrapperRef.current &&
        !testWrapperRef.current.contains(e.target)
      ) {
        setShowTestDropdown(false);
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
      labPatientId: "",
    });

    setShowDropdown(true);
  };
  const handleSelectPatient = (patient) => {
    setFormData({
      ...formData,
      labPatientId: patient._id,
    });

    setSearchTerm(getPatientName(patient));
    setShowDropdown(false);
  };
  const handlePriorityChange = (e) => {
    setFormData({
      ...formData,
      priority: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.labPatientId) {
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

          <div className="relative" ref={testWrapperRef}>
            <label className="text-sm font-medium">Lab Test</label>

            <input
              value={testSearch}
              onChange={(e) => {
                setTestSearch(e.target.value);

                setFormData({
                  ...formData,
                  tests: [
                    {
                      testId: "",
                      testName: e.target.value,
                    },
                  ],
                });

                setShowTestDropdown(true);
              }}
              onFocus={() => setShowTestDropdown(true)}
              className="w-full border rounded-xl px-4 py-3 mt-1"
              placeholder="Search Lab Test..."
              autoComplete="off"
              required
            />

            {showTestDropdown && filteredTests.length > 0 && (
              <div className="absolute z-20 w-full bg-white border rounded-xl mt-1 shadow-lg max-h-52 overflow-y-auto">
                {filteredTests.map((test) => (
                  <button
                    key={test._id}
                    type="button"
                    onClick={() => handleSelectTest(test)}
                    className="w-full text-left px-4 py-3 hover:bg-purple-50"
                  >
                    <div className="font-medium">
                      {test.name || "No Test Name"}
                    </div>

                    <div className="text-xs text-gray-500">
                      Rs. {test.price}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showTestDropdown && testSearch && filteredTests.length === 0 && (
              <div className="absolute z-20 w-full bg-white border rounded-xl mt-1 px-4 py-3 text-sm text-gray-500 shadow-lg">
                No test found
              </div>
            )}
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
