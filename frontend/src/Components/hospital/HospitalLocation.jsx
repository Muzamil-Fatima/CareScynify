import React from "react";

const HospitalLocation = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Hospital Location
        </h1>
        <p className="text-gray-600 mb-8">
          Find our hospital easily using the map below
        </p>

        {/* Map Box */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">

          <div className="w-full h-[400px] rounded-xl overflow-hidden">
            <iframe
              title="hospital-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.123456789!2d74.5200!3d32.4860!2m3!1f0!2f0!3f0!3m2"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          {/* Info */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-blue-600">
              City Care Hospital
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Main GT Road, Narowal, Punjab, Pakistan
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HospitalLocation;