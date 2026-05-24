import React, { useState } from "react";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GTranslateRoundedIcon from "@mui/icons-material/GTranslateRounded";

const Languages = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [languages, setLanguages] = useState([
    {
      id: 1,
      language: "English",
      proficiency: "Professional",
    },
    {
      id: 2,
      language: "Urdu",
      proficiency: "Native",
    },
  ]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    language: "",
    proficiency: "Conversational",
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      language: "",
      proficiency: "Conversational",
    });
    setIsOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setIsOpen(false);
    setForm({
      language: "",
      proficiency: "Conversational",
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.language.trim()) return;

    if (editingId) {
      setLanguages((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      setLanguages((prev) => [
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
    setLanguages((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TranslateOutlinedIcon className="text-purple-600" />
            Languages
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Add languages you can speak with proficiency.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-medium shadow-sm"
        >
          <AddRoundedIcon fontSize="small" />
          Add Language
        </button>
      </div>

      {/* EMPTY STATE */}
      {languages.length === 0 ? (
        <div className="border-2 border-dashed border-slate-300 rounded-[30px] bg-slate-50 py-16 px-6 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-5">
            <GTranslateRoundedIcon
              sx={{ fontSize: 46 }}
              className="text-slate-400"
            />
          </div>

          <h3 className="text-xl font-semibold text-slate-700">
            No Languages Added
          </h3>

          <p className="text-slate-500 text-sm mt-2 max-w-md">
            Add languages you speak to improve communication
            with patients.
          </p>

          <button
            onClick={openAddModal}
            className="mt-5 border border-slate-300 hover:bg-slate-100 transition rounded-2xl px-5 py-2.5 flex items-center gap-2 text-slate-700 font-medium"
          >
            <AddRoundedIcon fontSize="small" />
            Add Language
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-[28px] p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <TranslateOutlinedIcon className="text-purple-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">
                      {item.language}
                    </h3>

                    <span className="inline-flex mt-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                      {item.proficiency}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-500 hover:text-purple-600 transition flex items-center justify-center"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-4xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId
                    ? "Edit Language"
                    : "Add Language"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add spoken language with proficiency
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
              className="p-6 space-y-5"
            >
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Language
                </label>

                <input
                  type="text"
                  placeholder="English"
                  value={form.language}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Proficiency
                </label>

                <select
                  value={form.proficiency}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      proficiency: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 transition"
                >
                  <option>Native</option>
                  <option>Professional</option>
                  <option>Fluent</option>
                  <option>Intermediate</option>
                  <option>Conversational</option>
                  <option>Basic</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-3">
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

export default Languages;