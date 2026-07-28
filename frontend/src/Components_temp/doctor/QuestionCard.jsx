import React from "react";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";

const QuestionCard = ({ question }) => {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
      
      {/* Question */}
      <div className="flex items-start gap-2">
        <QuestionAnswerOutlinedIcon className="text-purple-600 mt-1" />
        <div>
          <p className="font-medium text-gray-800">
            {question?.question || "Sample question goes here?"}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Asked by {question?.user || "Patient"} • {question?.date || "Recently"}
          </p>
        </div>
      </div>

      {/* Answer */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 ml-6">
        
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium text-gray-800 text-sm">
            Doctor Answer
          </p>

          <VerifiedIcon fontSize="small" className="text-blue-500" />
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {question?.answer ||
            "This is a sample doctor response explaining the medical condition in simple terms."}
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;