import React, { useState } from "react";
import toast from "react-hot-toast";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EducationTab = () => {
  // Mock data state for doctor qualifications list
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      degree: "FCPS in Cardiology",
      institute: "College of Physicians and Surgeons Pakistan",
      passingYear: "2018",
    },
    {
      id: 2,
      degree: "MBBS",
      institute: "King Edward Medical University",
      passingYear: "2012",
    },
  ]);

  const [newEdu, setNewEdu] = useState({
    degree: "",
    institute: "",
    passingYear: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEdu((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!newEdu.degree || !newEdu.institute || !newEdu.passingYear) {
      toast.error("Please fill all fields to add qualification.");
      return;
    }

    setQualifications([{ id: Date.now(), ...newEdu }, ...qualifications]);
    setNewEdu({ degree: "", institute: "", passingYear: "" });
    toast.success("Qualification added to list!");
  };

  const handleDelete = (id) => {
    setQualifications(qualifications.filter((item) => item.id !== id));
    toast.error("Qualification removed.");
  };

  const handleSaveAll = () => {
    // Apni API call integrate yahan karein database update k liye
    toast.success("Academic profile updated successfully!");
  };

  return (
    <div className="space-y-8 w-full min-w-0">
      {/* Header Profile Title */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <SchoolOutlinedIcon className="text-purple-600" />
          Education & Qualifications
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Log your chronological academic background, medical degree history,
          and specialist training programs.
        </p>
      </div>

      {/* 1. ADD NEW EDUCATION FORM */}
      <div className="p-5 bg-slate-50/60 rounded-3xl border border-slate-100 space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <AddCircleOutlineOutlinedIcon
            fontSize="small"
            className="text-purple-600"
          />
          Add Qualification / Training
        </h4>

        <form
          onSubmit={handleAddEducation}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">
              Degree / Certification
            </label>
            <input
              type="text"
              name="degree"
              value={newEdu.degree}
              onChange={handleInputChange}
              placeholder="e.g. MBBS or FCPS"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-600 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">
              Medical School / Institute
            </label>
            <input
              type="text"
              name="institute"
              value={newEdu.institute}
              onChange={handleInputChange}
              placeholder="e.g. King Edward Medical College"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-600 transition"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">
                Passing Year
              </label>
              <input
                type="number"
                name="passingYear"
                value={newEdu.passingYear}
                onChange={handleInputChange}
                placeholder="e.g. 2014"
                min="1950"
                max="2026"
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-600 transition"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium p-3 rounded-xl transition shadow-xs flex items-center justify-center cursor-pointer h-[42px]"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {/* 2. TIMELINE HISTORY TRACK */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <HistoryEduOutlinedIcon fontSize="small" className="text-slate-400" />
          Education Timeline
        </h4>

        {qualifications.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            No education history items recorded. Use the form above to add your
            degrees.
          </div>
        ) : (
          <div className="relative border-l-2 border-purple-100 ml-3 pl-6 space-y-6">
            {qualifications.map((item) => (
              <div key={item.id} className="relative group">
                {/* Custom Dot Indicator */}
                <div className="absolute -left-7.75 top-1.5 w-4 h-4 bg-white border-2 border-purple-600 rounded-full group-hover:bg-purple-600 transition-colors" />

                <div className="flex items-start justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-purple-200 transition">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-sm">
                      Class of {item.passingYear}
                    </span>
                    <h5 className="text-sm font-bold text-slate-800 pt-1">
                      {item.degree}
                    </h5>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.institute}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-300 hover:text-red-500 transition cursor-pointer p-1"
                    title="Delete Entry"
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. CORE SUBMIT BUTTON */}
      <div className="flex justify-end pt-4 border-t border-slate-50">
        <button
          onClick={handleSaveAll}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
        >
          Save Academic Profile
        </button>
      </div>
    </div>
  );
};

export default EducationTab;
