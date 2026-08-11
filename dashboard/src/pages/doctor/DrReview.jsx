import React, { useEffect, useState } from "react";

import { getDoctorReviews } from "../../api/reviewApi";
import useGlobalSearch from "../../hooks/doctor/useGlobalSearch";

const DrReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchValue, results: searchResults } = useGlobalSearch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getDoctorReviews();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // SEARCH REVIEWS

  const isSearching = searchValue.trim().length > 0;

  const displayedReviews = isSearching
    ? searchResults
        .filter((result) => result?.type === "review")
        .map((result) => result?.data)
        .filter((review) => review?._id)
    : reviews;

  // AVERAGE RATING

  const averageRating =
    displayedReviews.length > 0
      ? displayedReviews.reduce(
          (acc, item) => acc + Number(item?.rating || 0),
          0,
        ) / displayedReviews.length
      : 0;

  return (
    <div className="p-6">
      {/* Page Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>

      {/* Rating Summary */}
      <div className="mb-8 rounded-xl bg-white shadow-sm border border-gray-100">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Overall Rating
          </h3>

          <div className="flex items-center gap-4 mt-2">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${
                    star <= averageRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <span className="text-gray-700">
              {averageRating.toFixed(1)} / 5
            </span>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
              {displayedReviews.length} Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <p className="text-gray-700">Loading reviews...</p>
      ) : displayedReviews.length === 0 ? (
        <p className="text-gray-500">
          {isSearching
            ? `No reviews found for "${searchValue}"`
            : "No reviews found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedReviews.map((review) => (
            <div
              key={review._id}
              className="rounded-xl bg-white shadow-md border border-gray-100"
            >
              <div className="p-6">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="shrink-0">
                    {review?.patient?.avatar?.url ? (
                      <img
                        src={review.patient.avatar.url}
                        alt={review?.patient?.name || "User"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {review?.patient?.name?.[0] || "U"}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      {review?.patient?.name || "Unknown Patient"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(review?.createdAt).toDateString()}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        star <= review?.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-4 text-gray-500">{review?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrReview;
