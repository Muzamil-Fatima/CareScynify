import React from "react";

const defaultImages = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  "https://images.unsplash.com/photo-1580281657521-0c5d7d0a5a3f",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3a1b",
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f",
];

const ClinicGallery = ({ images }) => {
  const data = images?.length ? images : defaultImages;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Clinic Gallery
      </h2>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

        {data.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border hover:scale-[1.02] transition duration-200 cursor-pointer"
          >
            <img
              src={img}
              alt={`clinic-${index}`}
              className="w-full h-28 object-cover"
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default ClinicGallery;