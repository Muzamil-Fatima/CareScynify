import React, { useState } from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";

const TotalWorkPlaces = () => {
  const { profile, setProfile, setIsDirty } = useDoctor();

  const workplaces = profile.doctor?.workplaces || [];

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "clinic",
  });

  // OPEN ADD
  const openAdd = () => {
    setForm({ name: "", location: "", type: "clinic" });
    setEditIndex(null);
    setOpen(true);
  };

  // OPEN EDIT
  const openEdit = (item, index) => {
    setForm(item);
    setEditIndex(index);
    setOpen(true);
  };

  // SAVE (ADD OR EDIT)
  const handleSave = () => {
    let updated = [...workplaces];

    if (editIndex !== null) {
      updated[editIndex] = form; // EDIT
    } else {
      updated.push(form); // ADD
    }

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        workplaces: updated,
      },
    }));

    setIsDirty(true);
    setOpen(false);
  };

  // DELETE
  const handleDelete = (index) => {
    const updated = workplaces.filter((_, i) => i !== index);

    setProfile((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        workplaces: updated,
      },
    }));

    setIsDirty(true);
  };

  return (
    <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Work Places</h2>

        {/* PLUS BUTTON */}
        <button
          onClick={openAdd}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl hover:bg-purple-700 transition shadow-sm hover:shadow-purple-300"
        >
          +
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {workplaces.length === 0 ? (
          <p className="text-slate-400 text-sm">No workplaces added</p>
        ) : (
          workplaces.map((w, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white border border-slate-100
                         shadow-sm hover:shadow-purple-100 hover:border-purple-200
                         transition group"
            >
              <div className="flex justify-between items-start">
                {/* LEFT INFO */}
                <div>
                  <p className="font-medium text-slate-800">{w.name}</p>
                  <p className="text-slate-500 text-sm">{w.location}</p>
                  <span className="text-xs text-purple-600 font-medium">
                    {w.type}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEdit(w, i)}
                    className="text-xs px-2 py-1 rounded-md bg-purple-50 text-purple-600 hover:bg-purple-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(i)}
                    className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-500 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-slate-100 relative">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-slate-400 hover:text-slate-700 text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4 text-slate-800">
              {editIndex !== null ? "Edit Workplace" : "Add Workplace"}
            </h3>

            {/* NAME */}
            <input
              type="text"
              placeholder="Hospital / Clinic Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 p-2.5 rounded-lg border border-slate-200
                         outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* LOCATION */}
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full mb-3 p-2.5 rounded-lg border border-slate-200
                         outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* TYPE */}
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full mb-4 p-2.5 rounded-lg border border-slate-200
                         outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="clinic">Clinic</option>
              <option value="hospital">Hospital</option>
            </select>

            {/* SAVE */}
            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-lg bg-purple-600 text-white
                         hover:bg-purple-700 transition"
            >
              {editIndex !== null ? "Update Workplace" : "Save Workplace"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalWorkPlaces;
