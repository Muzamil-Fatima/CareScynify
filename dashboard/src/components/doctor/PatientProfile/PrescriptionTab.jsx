import React, { useState } from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
const inputClass =
  "w-full rounded-xl bg-slate-50 border border-transparent shadow-sm px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

const textareaClass =
  "w-full rounded-xl bg-slate-50 border border-transparent shadow-sm px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 resize-none outline-none focus:outline-none transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 appearance-none";
const outerBox =
  "bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all";
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
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />
          <h2 className="font-semibold text-lg">Diagnosis</h2>
        </div>

        <textarea
          rows="4"
          placeholder="Enter diagnosis..."
          className={textareaClass}
        />
      </div>

      {/* Symptoms */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />
          <h2 className="font-semibold text-lg">Symptoms</h2>
        </div>

        <textarea
          rows="4"
          className={textareaClass}
          placeholder="Enter symptoms..."
        />
      </div>

      {/* Medicines */}
      <div className={outerBox}>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <MedicationRoundedIcon className="text-green-600" />
            <h2 className="font-semibold text-lg">Medicines</h2>
          </div>

          <button
            onClick={addMedicine}
            className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            <AddRoundedIcon fontSize="small" />
            Add Medicine
          </button>
        </div>

        <div className="space-y-5">
          {medicines.map((item, index) => (
            <div key={index} className={outerBox}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={item.medicine}
                  onChange={(e) =>
                    handleChange(index, "medicine", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  type="text"
                  placeholder="Dosage"
                  value={item.dosage}
                  onChange={(e) =>
                    handleChange(index, "dosage", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  type="text"
                  placeholder="Frequency"
                  value={item.frequency}
                  onChange={(e) =>
                    handleChange(index, "frequency", e.target.value)
                  }
                  className={inputClass}
                />

                <input
                  type="text"
                  placeholder="Duration"
                  value={item.duration}
                  onChange={(e) =>
                    handleChange(index, "duration", e.target.value)
                  }
                  className={inputClass}
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
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <BiotechRoundedIcon className="text-blue-600" />
          <h2 className="font-semibold text-lg">Recommended Lab Tests</h2>
        </div>

        <textarea
          rows="3"
          className={textareaClass}
          placeholder="CBC, Blood Sugar, X-Ray..."
        />
      </div>

      {/* Advice */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-orange-600" />
          <h2 className="font-semibold text-lg">Advice</h2>
        </div>

        <textarea
          rows="4"
          placeholder="Write advice for the patient..."
          className={textareaClass}
        />
      </div>

      {/* Follow Up */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <EventRoundedIcon className="text-purple-600" />
          <h2 className="font-semibold text-lg">Follow-up Date</h2>
        </div>

        <input type="date" className={inputClass} />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-medium">
          Save Prescription
        </button>
      </div>
    </div>
  );
};

export default PrescriptionTab;
