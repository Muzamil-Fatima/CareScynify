import React from "react";

const OurTec = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-10 md:py-16">

      <div className="p-8 rounded-2xl bg-linear-to-br from-purple-50 to-white shadow-lg border">
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          To revolutionize healthcare by connecting patients and doctors
          through intelligent, fast, and secure digital systems.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-linear-to-br from-indigo-50 to-white shadow-lg border">
        <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed">
          To become a leading AI-powered healthcare platform that improves
          accessibility, efficiency, and patient care worldwide.
        </p>
      </div>

    </div>
  );
};

export default OurTec;