import React from "react";

const HospitalAbout = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          About Our Hospital
        </h1>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to our hospital platform, where we connect patients with
          trusted healthcare services. Our mission is to provide easy access
          to medical care, specialist doctors, and reliable hospital
          information all in one place.
        </p>

        {/* Mission Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to improve healthcare accessibility by using modern
            technology. Our system helps patients find hospitals, book
            appointments, and get reliable medical support quickly and
            efficiently.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            To build a smart healthcare ecosystem where every patient can
            easily access quality medical services without delays or confusion.
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            What We Offer
          </h2>

          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Find nearby hospitals and clinics</li>
            <li>Online appointment booking system</li>
            <li>Doctor profiles and specialization details</li>
            <li>Emergency support access</li>
            <li>Easy and user-friendly interface</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default HospitalAbout;