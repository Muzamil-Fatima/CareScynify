import React, { useMemo, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import VerifiedIcon from "@mui/icons-material/Verified";

const DoctorReviews = ({ reviews = [] }) => {
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;
  const [search, setSearch] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevant");
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <StarIcon key={i} className="text-yellow-500" fontSize="small" />
      ) : (
        <StarBorderIcon key={i} className="text-gray-300" fontSize="small" />
      ),
    );
  };
  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };
  const filteredReviews = useMemo(() => {
    let data = [...reviews];

    // Rating Filter
    if (selectedRating) {
      data = data.filter((r) => r.rating === selectedRating);
    }

    // Search
    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(
        (r) =>
          r.patient?.name?.toLowerCase().includes(value) ||
          r.comment?.toLowerCase().includes(value),
      );
    }

    // Sort
    switch (sortBy) {
      case "recent":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      case "highest":
        data.sort((a, b) => b.rating - a.rating);
        break;

      case "lowest":
        data.sort((a, b) => a.rating - b.rating);
        break;

      default:
        break;
    }

    return data;
  }, [reviews, selectedRating, search, sortBy]);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Patient Reviews</h2>

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Rating Breakdown
          </h3>

          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star];
            const percentage =
              reviews.length > 0 ? (count / reviews.length) * 100 : 0;

            return (
              <div
                key={star}
                onClick={() =>
                  setSelectedRating(selectedRating === star ? 0 : star)
                }
                className={`flex items-center gap-3 mb-3 cursor-pointer rounded-lg p-2 transition
            ${
              selectedRating === star
                ? "bg-yellow-50 border border-yellow-300"
                : "hover:bg-gray-50"
            }`}
              >
                <span className="w-14 font-medium text-gray-700">
                  {star} Star
                </span>

                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="text-gray-600 text-sm w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}

          <button
            onClick={() => setSelectedRating(0)}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Show All Reviews
          </button>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Search & Filter
          </h3>

          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full mt-4 border border-gray-300 rounded-xl px-4 py-3"
          >
            <option value="relevant">Most Relevant</option>
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>
      {/* Review List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No reviews yet.</div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-100 rounded-xl p-4 bg-gray-50"
            >
              {/* Name + Verified */}
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-800">
                  {review.patient?.name || "Anonymous"}
                </p>

                <VerifiedIcon fontSize="small" className="text-blue-500" />
              </div>

              {/* Stars */}
              <div className="flex mt-1">{renderStars(review.rating)}</div>

              {/* Comment */}
              <p className="text-sm text-gray-600 mt-2">{review.comment}</p>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-2">
                {formatDate(review.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorReviews;
