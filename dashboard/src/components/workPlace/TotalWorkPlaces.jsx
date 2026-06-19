import React, { useState, useMemo } from "react";
import { useDoctor } from "../../context/doctor/DoctorContext";

const TotalWorkPlaces = () => {
  const { profile, workplace } = useDoctor();

  const workplaces = useMemo(
    () => profile.doctor?.workplaces || [],
    [profile.doctor?.workplaces]
  );

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "clinic",
  });

  // OPEN ADD
  const openAdd = () => {
    setForm({ name: "", location: "", type: "clinic" });
    setEditId(null);
    setOpen(true);
  };

  // OPEN EDIT
  const openEdit = (item) => {
    setForm(item);
    setEditId(item._id);
    setOpen(true);
  };

  // SAVE
  const handleSave = async () => {
    if (editId) {
      await workplace.updateWorkplace(editId, form);
    } else {
      await workplace.addWorkplace(form);
    }

    setOpen(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    await workplace.deleteWorkplace(id);
  };

  return (
    <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Work Places</h2>

        <button
          onClick={openAdd}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl hover:bg-purple-700 transition shadow-sm"
        >
          +
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {workplaces.length === 0 ? (
          <p className="text-slate-400 text-sm">No workplaces added</p>
        ) : (
          workplaces.map((w) => (
            <div
              key={w._id}
              className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition group"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{w.name}</p>
                  <p className="text-sm text-slate-500">{w.location}</p>
                  <span className="text-xs text-purple-600">{w.type}</span>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(w)}
                    className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(w._id)}
                    className="text-xs px-2 py-1 bg-red-50 text-red-500 rounded"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">

            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Workplace" : "Add Workplace"}
            </h3>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Hospital / Clinic Name"
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="clinic">Clinic</option>
              <option value="hospital">Hospital</option>
            </select>

            <button
              onClick={handleSave}
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setOpen(false)}
              className="w-full mt-2 bg-gray-200 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalWorkPlaces;