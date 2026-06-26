import React from "react";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useSymptom } from "../../context/symptomAnalyzer/SymptomContext";

const AnalysisResult = () => {
  const { analysis } = useSymptom();

  if (!analysis) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <MonitorHeartOutlinedIcon
            sx={{ fontSize: 35 }}
            className="text-green-600"
          />

          <h2 className="text-2xl font-semibold">AI Analysis Result</h2>
        </div>

        <p className="text-gray-500 text-center mt-20">
          Analyze symptoms to view results.
        </p>
      </div>
    );
  }

  const result = analysis.result;

  return (
    <div className="bg-white rounded-3xl shadow-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <MonitorHeartOutlinedIcon
          sx={{ fontSize: 35 }}
          className="text-green-600"
        />

        <h2 className="text-2xl font-semibold">AI Analysis Result</h2>
      </div>

      {/* Conditions */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Possible Conditions</h3>

        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          {result.conditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
      </div>

      {/* Severity */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Severity Level</h3>

        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
          {result.severity}
        </span>
      </div>

      {/* Specialist */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
          <LocalHospitalOutlinedIcon />
          Recommended Specialist
        </h3>

        <div className="bg-blue-50 text-blue-700 p-4 rounded-xl">
          {result.specialist}
        </div>
      </div>

      {/* Home Care */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Home Care Tips</h3>

        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          {result.homeCare.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Emergency */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <WarningAmberOutlinedIcon className="text-red-600" />

          <h3 className="font-semibold text-red-700">
            Emergency Warning Signs
          </h3>
        </div>

        <ul className="list-disc ml-6 text-red-600 space-y-2">
          {result.emergencySigns.map((sign, index) => (
            <li key={index}>{sign}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResult;
