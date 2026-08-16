
import React from "react";
import { useNavigate } from "react-router-dom";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";

const AIAnalyzerCard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-violet-600 to-fuchsia-600 p-6 shadow-lg h-full">
      {/* Decorative Circles */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-white/10"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5">
          <PsychologyRoundedIcon
            sx={{ fontSize: 34 }}
            className="text-white"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white">
          AI Symptom Analyzer
        </h2>

        {/* Description */}
        <p className="text-purple-100 mt-3 leading-relaxed">
          Describe your symptoms and get AI-powered preliminary health insights
          before consulting a doctor.
        </p>

        {/* Features */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-white">
            <AutoAwesomeRoundedIcon fontSize="small" />
            <span className="text-sm">
              Intelligent symptom assessment
            </span>
          </div>

          <div className="flex items-center gap-3 text-white">
            <HealthAndSafetyRoundedIcon fontSize="small" />
            <span className="text-sm">
              Personalized health recommendations
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Button */}
        <button
          onClick={() => navigate("/symptom-analyzer")}
          className="mt-8 w-full bg-white text-purple-700 font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300"
        >
          Start Analysis
          <ArrowForwardRoundedIcon />
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-purple-200 mt-4 text-center">
          AI insights are for informational purposes only and do not replace
          professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default AIAnalyzerCard;