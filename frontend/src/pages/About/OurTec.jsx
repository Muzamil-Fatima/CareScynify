import React from "react";

const OurTec = () => {
  return (
    <div className="bg-blue-50 grid grid-cols-1 md:grid-cols-2 p-6 gap-6 md-p-16 mt-16">
      <div className="px-4 md:px-6">
        <h7 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4">
          Our Mission
        </h7>
        <p className="text-sm sm:text-base md:text-lg">
          To bridge the gap between students and industry by creating an
          ecosystem of learning, collaboration, and real-world exposure.
        </p>
      </div>
      <div className="px-4 md:px-6">
        <h7 className="text-2xl font-bold mb-4">Our Vision</h7>
        <p className="text-sm sm:text-base md:text-lg">
          To become India’s leading student-focused tech hub that fosters
          innovation through internships, hackathons, and hands-on projects,
          making youth industry-ready.
        </p>
      </div>
    </div>
  );
};

export default OurTec;
