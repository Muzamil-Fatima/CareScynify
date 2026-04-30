import React, { useState } from "react";

const MedicalHistory = () => {
  const [formData, setFormData] = useState({
    diseases: "",
    allergies: "",
    medications: "",
    surgeries: "",
    familyHistory: "",
    smoking: "",
    alcohol: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API call later
    console.log("Medical History:", formData);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const labelClass = "mb-2 text-sm font-medium text-gray-600";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Medical History
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Diseases */}
        <div className="md:col-span-2">
          <label className={labelClass}>Diseases</label>
          <textarea
            name="diseases"
            value={formData.diseases}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder="e.g. Diabetes, Blood Pressure"
          />
        </div>

        {/* Allergies */}
        <div className="md:col-span-2">
          <label className={labelClass}>Allergies</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder="e.g. Dust, Penicillin"
          />
        </div>

        {/* Medications */}
        <div className="md:col-span-2">
          <label className={labelClass}>Current Medications</label>
          <textarea
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder="Ongoing medicines"
          />
        </div>

        {/* Surgeries */}
        <div className="md:col-span-2">
          <label className={labelClass}>Past Surgeries</label>
          <textarea
            name="surgeries"
            value={formData.surgeries}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder="If any surgery done"
          />
        </div>

        {/* Family History */}
        <div className="md:col-span-2">
          <label className={labelClass}>Family History</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder="Genetic diseases in family"
          />
        </div>

        {/* Smoking */}
        <div>
          <label className={labelClass}>Smoking</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </div>

        {/* Alcohol */}
        <div>
          <label className={labelClass}>Alcohol</label>
          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default MedicalHistory;
