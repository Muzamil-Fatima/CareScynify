import React from "react";
// import AboutImg from "../../assets/images/AboutImage.png";
import WeDo from "../Components/About/WeDo";
import OurTec from "../Components/About/OurTec";

const AboutUs = () => {
  return (
    <div className="bg-linear-to-b from-white via-purple-50 to-white min-h-screen">

      {/* HERO */}
      <div className="text-center px-4 pt-16 pb-10">
        <span className="px-4 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
          About CareScynify
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold mt-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Building Future Healthcare Tech
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          A smart ecosystem connecting patients, doctors, and healthcare systems
          with modern AI-powered solutions and real-time digital care.
        </p>
      </div>

      {/* WHO WE ARE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-16 items-center py-10">

        <div className="relative">
          <img
            // src={AboutImg}
            alt="CareScynify"
            className="rounded-3xl shadow-2xl border border-purple-200"
          />

          {/* floating glow */}
          <div className="absolute -inset-4 bg-purple-300 blur-3xl opacity-20 rounded-full -z-10"></div>
        </div>

        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            CareScynify is a next-generation healthcare platform designed to
            simplify patient care, hospital management, and digital health
            workflows using modern technology.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            We focus on building scalable systems for appointments, medical
            records, AI assistance, and real-time communication between
            patients and healthcare providers.
          </p>

          <div className="flex gap-3 pt-4">
            <button className="px-6 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition">
              Learn More
            </button>
            <button className="px-6 py-2 rounded-xl border border-purple-300 text-purple-700 hover:bg-purple-50 transition">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* WHAT WE DO */}
      <div className="px-6 md:px-16 py-10">
        <WeDo />
      </div>

      {/* MISSION / VISION */}
      <div className="px-6 md:px-16 py-10">
        <OurTec />
      </div>
    </div>
  );
};

export default AboutUs;