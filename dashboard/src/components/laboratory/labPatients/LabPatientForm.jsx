import React from "react";
import { UserPlus, Save, X } from "lucide-react";

import PhoneInput from "../../common/PhoneInput";

export default function LabPatientForm({
  formData,
  handleInputChange,
  handleFormSubmit,
  testsList = [],
  editingPatient,
  resetForm,
}) {
  const inputStyle =
    "w-full border border-gray-200 rounded-xl p-3 bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition";

  const selectStyle =
    "w-full border border-gray-200 rounded-xl p-3 bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition";

  const labelStyle =
    "block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2";

  return (
    <div className="rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-xl shadow-xl p-7 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center">
          <UserPlus className="text-violet-600" size={20} />
        </div>

        <div>
          <h3 className="font-bold text-slate-800">
            {editingPatient ? "Update Patient" : "New Patient Entry"}
          </h3>

          <p className="text-xs text-slate-500">
            {editingPatient
              ? "Edit Laboratory Patient Details"
              : "Register Laboratory Patient"}
          </p>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* Patient Name */}
        <div>
          <label className={labelStyle}>Patient Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter patient name"
            className={inputStyle}
          />
        </div>

        {/* Mobile */}
        <div>
          <label className={labelStyle}>Mobile Number</label>

          <PhoneInput
            label=""
            inputStyle={inputStyle}
            value={formData.mobile}
            onChange={(value) =>
              handleInputChange({
                target: {
                  name: "mobile",
                  value,
                },
              })
            }
          />
        </div>

        {/* Age */}
        <div>
          <label className={labelStyle}>Age</label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter age"
            className={inputStyle}
          />
        </div>

        {/* Gender */}
        <div>
          <label className={labelStyle}>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={selectStyle}
          >
            <option value="">Select Gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="Other">Other</option>
          </select>
        </div>

        {/* Test */}
        <div>
          <label className={labelStyle}>Test Name</label>

          <select
            name="testId"
            value={formData.testId}
            onChange={handleInputChange}
            className={selectStyle}
          >
            <option value="">Select Test</option>

            {testsList.map((test) => (
              <option key={test._id} value={test._id}>
                {test.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className={labelStyle}>Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            placeholder="Enter notes..."
            className="w-full rounded-2xl border border-violet-200 bg-violet-50/50 px-5 py-3 text-sm text-gray-700 outline-none transition resize-none focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>

        {/* Buttons */}
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 w-full rounded-2xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {editingPatient ? (
              <>
                <Save size={17} />
                Update Patient
              </>
            ) : (
              <>
                <UserPlus size={17} />
                Register Patient
              </>
            )}
          </button>

          {editingPatient && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <X size={17} />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
