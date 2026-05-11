import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import VerifiedIcon from "@mui/icons-material/Verified";

const DoctorReviews = ({ doctor }) => {
  const reviews = doctor?.reviewsList || [
    {
      id: 1,
      name: "Ali Hassan",
      rating: 5,
      comment: "Very professional and helpful doctor. Explained everything clearly.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Sara Khan",
      rating: 4,
      comment: "Good experience overall. Recommended.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Ahmed Raza",
      rating: 5,
      comment: "Excellent diagnosis and very polite behavior.",
      date: "2 months ago",
    },
  ];

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

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
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Patient Reviews
        </h2>

        {/* Rating Summary */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-2xl font-bold text-gray-800">
            {avgRating.toFixed(1)}
          </span>

          <div className="flex">{renderStars(Math.round(avgRating))}</div>

          <span className="text-sm text-gray-500">
            ({reviews.length} reviews)
          </span>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-100 rounded-xl p-4 bg-gray-50"
          >
            
            {/* Name + Verified */}
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-800">
                {review.name}
              </p>

              <VerifiedIcon fontSize="small" className="text-blue-500" />
            </div>

            {/* Stars */}
            <div className="flex mt-1">
              {renderStars(review.rating)}
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-600 mt-2">
              {review.comment}
            </p>

            {/* Date */}
            <p className="text-xs text-gray-400 mt-2">
              {review.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorReviews;