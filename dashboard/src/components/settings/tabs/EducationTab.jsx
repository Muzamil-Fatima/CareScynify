import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import DoctorContext from "../../../context/doctor/DoctorContext";

const emptyForm = {
  school: "",
  degree: "",
  field: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  grade: "",
  activities: "",
  description: "",
};

const EducationTab = () => {
  const { profile, addEducation, updateEducation, deleteEducation } =
    useContext(DoctorContext);

  const qualifications = profile?.doctor?.education || [];

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // OPEN ADD
  const openAddModal = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsOpen(true);
  };

  // OPEN EDIT
  const openEditModal = (item) => {
    setForm({
      school: item.school || "",
      degree: item.degree || "",
      field: item.field || "",
      startMonth: item.startMonth || "",
      startYear: item.startYear || "",
      endMonth: item.endMonth || "",
      endYear: item.endYear || "",
      grade: item.grade || "",
      activities: item.activities || "",
      description: item.description || "",
    });

    setEditingId(item.id || item._id);
    setIsOpen(true);
  };

  // SAVE
  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.school || !form.degree) {
      toast.error("School and Degree required");
      return;
    }

    try {
      if (editingId) {
        await updateEducation(editingId, form);
      } else {
        await addEducation(form);
      }

      setIsOpen(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <SchoolOutlinedIcon className="text-purple-600" />
          Education
        </h2>

        <button
          onClick={openAddModal}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm"
        >
          Add Education
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {qualifications.map((item) => (
          <div
            key={item.id || item._id}
            className="bg-white p-4 rounded-xl flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{item.school}</h3>
              <p className="text-sm text-slate-500">
                {item.degree} • {item.field}
              </p>
            </div>

            <div className="flex gap-3 text-slate-400">

              <button onClick={() => openEditModal(item)}>
                <EditOutlinedIcon fontSize="small" />
              </button>

              <button
                onClick={() =>
                  deleteEducation(item.id || item._id)
                }
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 space-y-4">

            <h2 className="text-lg font-bold">
              {editingId ? "Edit Education" : "Add Education"}
            </h2>

            <form onSubmit={handleSave} className="grid grid-cols-2 gap-3">

              <input
                name="school"
                value={form.school}
                onChange={handleChange}
                placeholder="School *"
                className="p-3 rounded-xl bg-slate-50 outline-none"
              />

              <input
                name="degree"
                value={form.degree}
                onChange={handleChange}
                placeholder="Degree"
                className="p-3 rounded-xl bg-slate-50 outline-none"
              />

              <input
                name="field"
                value={form.field}
                onChange={handleChange}
                placeholder="Field of study"
                className="p-3 rounded-xl bg-slate-50 outline-none col-span-2"
              />

              <input
                name="startYear"
                value={form.startYear}
                onChange={handleChange}
                placeholder="Start Year"
                className="p-3 rounded-xl bg-slate-50 outline-none"
              />

              <input
                name="endYear"
                value={form.endYear}
                onChange={handleChange}
                placeholder="End Year"
                className="p-3 rounded-xl bg-slate-50 outline-none"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="p-3 rounded-xl bg-slate-50 outline-none col-span-2"
              />

              {/* BUTTONS */}
              <div className="col-span-2 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white"
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default EducationTab;