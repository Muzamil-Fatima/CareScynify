import React from "react";

const HospitalReviews = () => {
  const reviews = [
    {
      name: "Ali Ahmed",
      rating: 5,
      comment: "Excellent hospital service and very professional doctors.",
    },
    {
      name: "Sara Khan",
      rating: 4,
      comment: "Good experience, but waiting time was a bit long.",
    },
    {
      name: "Usman Tariq",
      rating: 5,
      comment: "Very clean environment and helpful staff.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Patient Reviews
        </h1>
        <p className="text-gray-600 mb-8">
          What patients say about our hospital services
        </p>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
            >
              {/* Name */}
              <h2 className="text-lg font-semibold text-gray-800">
                {review.name}
              </h2>

              {/* Rating */}
              <p className="text-yellow-500 text-sm mt-1">
                {"⭐".repeat(review.rating)}
              </p>

              {/* Comment */}
              <p className="text-gray-600 text-sm mt-3">
                {review.comment}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HospitalReviews;