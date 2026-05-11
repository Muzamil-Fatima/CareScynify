import React from "react";

const HospitalGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    "https://images.unsplash.com/photo-1580281657527-47f249e8f1c8",
    "https://images.unsplash.com/photo-1551190822-a9333d879b1f",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842",
    "https://images.unsplash.com/photo-1603398938378-e54eab446dde",
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Hospital Gallery
        </h1>
        <p className="text-gray-600 mb-8">
          Take a look at our hospital environment and facilities
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
            >
              <img
                src={img}
                alt={`hospital-${index}`}
                className="w-full h-56 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HospitalGallery;