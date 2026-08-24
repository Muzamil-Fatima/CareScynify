import React from "react";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { analyzeSymptoms } from "../../api/symptomAnalyzerApi";
import { useSymptom } from "../../context/symptomAnalyzer/SymptomContext";
const SymptomForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { setAnalysis } = useSymptom();

  const handleAnalyze = async () => {
    try {
      const payload = {
        symptoms: formData.symptoms,
        age: formData.age,
        gender: formData.gender,
        duration: formData.duration,
      };

      console.log("Payload:", payload); // <-- add this

      const data = await analyzeSymptoms(payload);

      setAnalysis(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-3xl shadow-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <PsychologyOutlinedIcon
          sx={{ fontSize: 35 }}
          className="text-purple-600"
        />

        <h2 className="text-2xl font-semibold">Symptom Information</h2>
      </div>

      {/* Symptoms */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Enter Symptoms</label>

        <textarea
          rows="5"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Example: Fever, headache, sore throat"
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Age */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Age</label>

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter Age"
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Gender</label>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-8">
        <label className="block font-medium mb-3">Duration of Symptoms</label>

        <div className="space-y-3">
          {["1-2 days", "3-7 days", "More than a week"].map((item) => (
            <label key={item} className="flex items-center gap-3">
              <input
                type="radio"
                name="duration"
                value={item}
                checked={formData.duration === item}
                onChange={handleChange}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold transition cursor-pointer"
      >
        Analyze Symptoms
      </button>
    </div>
  );
};

export default SymptomForm;
