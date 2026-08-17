import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import VerifiedIcon from "@mui/icons-material/Verified";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <StarIcon key={i} className="text-yellow-500" fontSize="small" />
      ) : (
        <StarBorderIcon key={i} className="text-gray-300" fontSize="small" />
      )
    );
  };

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 sm:p-4 space-y-2">
      
      {/* Name + Verified */}
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-medium text-gray-800">
          {review?.name || "Patient Name"}
        </p>

        <VerifiedIcon fontSize="small" className="text-blue-500" />
      </div>

      {/* Stars */}
      <div className="flex">
        {renderStars(review?.rating || 5)}
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-600 leading-6 wrap-break-word">
        {review?.comment ||
          "This is a sample review about the doctor experience and treatment quality."}
      </p>

      {/* Date */}
      <p className="text-xs text-gray-400">
        {review?.date || "Recently"}
      </p>
    </div>
  );
};

export default ReviewCard;