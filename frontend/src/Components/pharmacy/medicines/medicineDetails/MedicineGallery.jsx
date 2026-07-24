import React, { useMemo, useState } from "react";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

const MedicineGallery = ({ images = [], medicineName = "Medicine" }) => {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images : []),
    [images]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = safeImages[selectedIndex]?.url || safeImages[0]?.url || "";

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="aspect-square w-full">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={medicineName}
              className="h-full w-full object-contain p-6 transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
              <ImageNotSupportedOutlinedIcon sx={{ fontSize: 70 }} />
              <p className="mt-3 text-sm">No Image Available</p>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {safeImages.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {safeImages.map((image, index) => (
            <button
              key={image._id || index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-white transition-all duration-200 ${
                selectedIndex === index
                  ? "border-purple-600 ring-2 ring-purple-200"
                  : "border-gray-200 hover:border-purple-400"
              }`}
            >
              <img
                src={image.url}
                alt={`${medicineName} ${index + 1}`}
                className="h-full w-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineGallery;