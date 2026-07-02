import React, { useState } from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const PrescriptionTab = () => {
  const [medicines, setMedicines] = useState([
    {
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ]);

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicine: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    const updated = [...medicines];
    updated.splice(index, 1);
    setMedicines(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  return (
    <div className="space-y-6">
      {/* Diagnosis */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />
          <h2 className="font-semibold text-lg">Diagnosis</h2>
        </div>

        <textarea
          rows="4"
          placeholder="Enter diagnosis..."
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Symptoms */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />
          <h2 className="font-semibold text-lg">Symptoms</h2>
        </div>

        <textarea
          rows="4"
          placeholder="Enter symptoms..."
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Medicines */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <MedicationRoundedIcon className="text-green-600" />
            <h2 className="font-semibold text-lg">Medicines</h2>
          </div>

          <button
            onClick={addMedicine}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            <AddRoundedIcon fontSize="small" />
            Add Medicine
          </button>
        </div>

        <div className="space-y-5">
          {medicines.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-gray-50"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={item.medicine}
                  onChange={(e) =>
                    handleChange(index, "medicine", e.target.value)
                  }
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Dosage"
                  value={item.dosage}
                  onChange={(e) =>
                    handleChange(index, "dosage", e.target.value)
                  }
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Frequency"
                  value={item.frequency}
                  onChange={(e) =>
                    handleChange(index, "frequency", e.target.value)
                  }
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Duration"
                  value={item.duration}
                  onChange={(e) =>
                    handleChange(index, "duration", e.target.value)
                  }
                  className="border rounded-lg p-3"
                />
              </div>

              {medicines.length > 1 && (
                <button
                  onClick={() => removeMedicine(index)}
                  className="mt-4 text-red-600 flex items-center gap-1"
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lab Tests */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-2 mb-4">
          <BiotechRoundedIcon className="text-blue-600" />
          <h2 className="font-semibold text-lg">Recommended Lab Tests</h2>
        </div>

        <textarea
          rows="3"
          placeholder="CBC, Blood Sugar, X-Ray..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Advice */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-orange-600" />
          <h2 className="font-semibold text-lg">Advice</h2>
        </div>

        <textarea
          rows="4"
          placeholder="Write advice for the patient..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Follow Up */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-2 mb-4">
          <EventRoundedIcon className="text-purple-600" />
          <h2 className="font-semibold text-lg">Follow-up Date</h2>
        </div>

        <input
          type="date"
          className="border rounded-lg p-3"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium">
          Save Prescription
        </button>
      </div>
    </div>
  );
};

export default PrescriptionTab;