import React from "react";

const HospitalProfileHeader = () => {
  return (
    <div className="bg-white shadow-md border-b border-gray-100">

      {/* Cover Section */}
      <div className="h-40 bg-linear-to-r from-blue-500 to-blue-700"></div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12">

          {/* Logo / Avatar */}
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 text-2xl font-bold border-4 border-white">
              HC
            </div>

            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-800">
                City Care Hospital
              </h1>
              <p className="text-gray-500 text-sm">
                Leading Healthcare Facility
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-4 sm:mt-0">
            <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
              24/7 Available
            </span>
          </div>

        </div>

        {/* Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pb-6">

          <div className="text-gray-600 text-sm">
            📍 Narowal, Punjab
          </div>

          <div className="text-gray-600 text-sm">
            ⭐ Rating: 4.6 / 5
          </div>

          <div className="text-gray-600 text-sm">
            📞 +92 300 1234567
          </div>

        </div>

      </div>
    </div>
  );
};

export default HospitalProfileHeader;