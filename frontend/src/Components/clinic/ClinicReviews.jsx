import React from "react";
import StarIcon from "@mui/icons-material/Star";

const ClinicReviews = ({ reviews = [] }) => {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  // Calculate average rating
  const avgRating =
    safeReviews.length > 0
      ? (
          safeReviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
          safeReviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-gray-800">
          Patient Reviews
        </h2>

        {/* Rating Summary */}
        <div className="flex items-center gap-1 text-yellow-500 font-medium">
          <StarIcon fontSize="small" />
          {avgRating}
          <span className="text-gray-500 text-sm">
            ({safeReviews.length} reviews)
          </span>
        </div>

      </div>

      {/* Reviews List */}
      <div className="space-y-4">

        {safeReviews.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No reviews yet for this clinic
          </p>
        ) : (
          safeReviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 hover:shadow-sm transition"
            >

              {/* User Info */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  {/* Avatar */}
                  <div className="w-10 h-10 bg-purple-100 text-purple-700 flex items-center justify-center rounded-full font-semibold">
                    {review?.name?.charAt(0) || "P"}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {review?.name || "Patient"}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {review?.date || "Recently"}
                    </p>
                  </div>

                </div>

                {/* Rating */}
                <span className="flex items-center text-yellow-500 text-sm">
                  <StarIcon fontSize="small" />
                  {review?.rating || 5}
                </span>

              </div>

              {/* Comment */}
              <p className="text-sm text-gray-600 mt-2">
                {review?.comment ||
                  "Great experience with the clinic and doctors."}
              </p>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ClinicReviews;