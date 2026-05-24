import React, { useState } from "react";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      hospital: "Mayo Hospital Lahore",
      role: "Cardiologist",
      employmentType: "Full-time",
      location: "Lahore, Pakistan",
      startYear: "2021",
      endYear: "",
      currentlyWorking: true,
      description:
        "Managing heart-related patients, diagnosis, and emergency cardiac procedures.",
    },
  ]);

  const [form, setForm] = useState({
    hospital: "",
    role: "",
    employmentType: "Full-time",
    location: "",
    startYear: "",
    endYear: "",
    currentlyWorking: false,
    description: "",
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      hospital: "",
      role: "",
      employmentType: "Full-time",
      location: "",
      startYear: "",
      endYear: "",
      currentlyWorking: false,
      description: "",
    });
    setIsOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.hospital || !form.role) return;

    if (editingId) {
      setExperiences((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...form } : item,
        ),
      );
    } else {
      setExperiences((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <WorkOutlineRoundedIcon className="text-purple-600" />
            Experience
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Add your professional workplace experience.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-medium shadow-sm"
        >
          <AddRoundedIcon fontSize="small" />
          Add Experience
        </button>
      </div>

      {/* EMPTY STATE */}
      {experiences.length === 0 ? (
        <div className="border-2 border-dashed border-slate-300 rounded-[30px] bg-slate-50 py-16 px-6 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-5">
            <BusinessCenterOutlinedIcon
              sx={{ fontSize: 48 }}
              className="text-slate-400"
            />
          </div>

          <h3 className="text-xl font-semibold text-slate-700">
            No Experience Added
          </h3>

          <p className="text-slate-500 text-sm mt-2 max-w-md">
            Add your workplace experience to build a stronger doctor profile.
          </p>

          <button
            onClick={openAddModal}
            className="mt-5 border border-slate-300 hover:bg-slate-100 transition rounded-2xl px-5 py-2.5 flex items-center gap-2 text-slate-700 font-medium"
          >
            <AddRoundedIcon fontSize="small" />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-[30px] p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start gap-5">
                <div className="flex gap-4 flex-1">
                  {/* ICON */}
                  <div className="min-w-15 h-15 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <BusinessCenterOutlinedIcon className="text-purple-600" />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-lg text-slate-800">
                        {item.role}
                      </h3>

                      <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                        {item.employmentType}
                      </span>
                    </div>

                    <p className="text-slate-700 font-medium mt-1">
                      {item.hospital}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {item.location}
                    </p>

                    <p className="text-sm text-slate-400 mt-2">
                      {item.startYear} -{" "}
                      {item.currentlyWorking
                        ? "Present"
                        : item.endYear || "Present"}
                    </p>

                    {item.description && (
                      <p className="text-slate-600 text-sm mt-4 leading-6">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-500 hover:text-purple-600 transition flex items-center justify-center"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 transition flex items-center justify-center"
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId ? "Edit Experience" : "Add Experience"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add your workplace details
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
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[75vh] overflow-y-auto"
            >
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Hospital / Clinic *
                </label>

                <input
                  type="text"
                  value={form.hospital}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      hospital: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500"
                  placeholder="Shifa Hospital"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Role *
                </label>

                <input
                  type="text"
                  value={form.role}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500"
                  placeholder="Cardiologist"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Employment Type
                </label>

                <select
                  value={form.employmentType}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      employmentType: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500"
                  placeholder="Lahore, Pakistan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Start Year
                </label>

                <input
                  type="number"
                  value={form.startYear}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      startYear: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

              {!form.currentlyWorking && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    End Year
                  </label>

                  <input
                    type="number"
                    value={form.endYear}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        endYear: e.target.value,
                      }))
                    }
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.currentlyWorking}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        currentlyWorking: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 accent-purple-600"
                  />

                  <span className="text-slate-700 font-medium">
                    I currently work here
                  </span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
                  placeholder="Describe your role and responsibilities"
                />
              </div>

              {/* FOOTER */}
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

export default Experience;
