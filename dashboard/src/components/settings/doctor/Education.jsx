import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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

const Education = () => {
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

  // CLOSE MODAL
  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setForm(emptyForm);
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
        toast.success("Education updated");
      } else {
        await addEducation(form);
        toast.success("Education added");
      }

      closeModal();
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

        {/* BUTTON HIDE NHI HOGA */}
        <button
          onClick={openAddModal}
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-xl text-sm font-medium"
        >
          Add Education
        </button>
      </div>

      {/* LIST / EMPTY STATE */}
      <div className="space-y-3">
        {qualifications.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-3xl py-10 px-6 flex flex-col items-center justify-center text-center bg-gray-50">
            {/* CENTER ICON */}
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <SchoolOutlinedIcon
                sx={{ fontSize: 50 }}
                className="text-gray-400"
              />
            </div>

            <h3 className="text-lg font-semibold text-slate-700">
              No Education Added Yet
            </h3>

            <p className="text-sm text-slate-500 mt-2 max-w-md">
              Add your education details to improve your doctor profile.
            </p>

            {/* SIMPLE BUTTON */}
            <button
              onClick={openAddModal}
              className="mt-5 flex items-center gap-2 border border-gray-300 hover:bg-gray-100 transition px-5 py-2.5 rounded-xl text-slate-700 font-medium"
            >
              <AddCircleOutlineOutlinedIcon fontSize="small" />
              Add Education
            </button>
          </div>
        ) : (
          qualifications.map((item) => (
            <div
              key={item.id || item._id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-start hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold text-slate-800 text-base">
                  {item.school}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {item.degree}
                  {item.field ? ` • ${item.field}` : ""}
                </p>

                {(item.startYear || item.endYear) && (
                  <p className="text-xs text-slate-400 mt-2">
                    {item.startYear || "—"} - {item.endYear || "Present"}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm text-slate-600 mt-3 max-w-lg">
                    {item.description}
                  </p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-500 hover:text-purple-600 transition flex items-center justify-center"
                >
                  <EditOutlinedIcon fontSize="small" />
                </button>

                <button
                  onClick={() => deleteEducation(item.id || item._id)}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 transition flex items-center justify-center"
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-[28px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId ? "Edit Education" : "Add Education"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Add your academic background
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full hover:bg-slate-100 transition flex items-center justify-center"
              >
                <CloseRoundedIcon />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSave}
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto"
            >
              <div className="space-y-1">
                <label className="text-sm text-slate-600">
                  School / University *
                </label>
                <input
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="Harvard University"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">Degree *</label>
                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="MBBS"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-slate-600">Field of Study</label>
                <input
                  name="field"
                  value={form.field}
                  onChange={handleChange}
                  placeholder="Medicine"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">Start Year</label>
                <input
                  type="number"
                  name="startYear"
                  value={form.startYear}
                  onChange={handleChange}
                  placeholder="2018"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-600">End Year</label>
                <input
                  type="number"
                  name="endYear"
                  value={form.endYear}
                  onChange={handleChange}
                  placeholder="2024"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm text-slate-600">Description</label>
                <textarea
                  rows={4}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell about your education, achievements, research etc."
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:border-purple-500 outline-none resize-none"
                />
              </div>

              {/* BUTTONS */}
              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition text-white font-medium"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
