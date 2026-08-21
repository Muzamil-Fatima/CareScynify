import React from "react";

import { useNavigate } from "react-router-dom";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";

const AIAnalyzerCard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#f5f3ff] via-[#ede9fe] to-[#faf5ff] p-6 shadow-lg h-full border border-[#e9d5ff]">
      {/* Decorative Circles */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#8b5cf6]/10"></div>

      <div className="absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-[#a855f7]/10"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#7c3aed]/10 backdrop-blur-sm flex items-center justify-center mb-5">
          <PsychologyRoundedIcon
            sx={{ fontSize: 34 }}
            className="text-[#7c3aed]"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#1e1b4b]">
          AI Symptom Analyzer
        </h2>

        {/* Description */}
        <p className="text-[#6b7280] mt-3 leading-relaxed">
          Describe your symptoms and get AI-powered preliminary health insights
          before consulting a doctor.
        </p>

        {/* Features */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-[#4c1d95]">
            <AutoAwesomeRoundedIcon fontSize="small" />

            <span className="text-sm">
              Intelligent symptom assessment
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#4c1d95]">
            <HealthAndSafetyRoundedIcon fontSize="small" />

            <span className="text-sm">
              Personalized health recommendations
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="grow"></div>

        {/* Button */}
        <button
          onClick={() => navigate("/symptom-analyzer")}
          className="mt-8 w-full bg-[#7c3aed] text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#6d28d9] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          Start Analysis
          <ArrowForwardRoundedIcon />
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-[#8b5cf6] mt-4 text-center">
          AI insights are for informational purposes only and do not replace
          professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default AIAnalyzerCard;