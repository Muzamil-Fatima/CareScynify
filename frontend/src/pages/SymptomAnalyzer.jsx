import React, { useState } from "react";
import PageHeader from "../components/symptomAnalyzer/PageHeader";
import SymptomForm from "../components/symptomAnalyzer/SymptomForm";
import AnalysisResult from "../components/symptomAnalyzer/AnalysisResult";

const SymptomAnalyzer = () => {
  const [formData, setFormData] = useState({
    symptoms: "",
    age: "",
    gender: "",
    duration: "",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SymptomForm formData={formData} setFormData={setFormData} />

          <AnalysisResult />
        </div>
      </div>
    </div>
  );
};

export default SymptomAnalyzer;
