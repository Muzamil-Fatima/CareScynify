import React from "react";
import Training from "../../../Images/Training.png";
import WeDo from "./WeDo";
import OurTec from "./OurTec";
const AboutUs = () => {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center mt-6">
        About Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 sm:p-10 gap-6">
        <img
          src={Training}
          alt=""
          className="shadow-2xl shadow-purple-600 rounded-2xl w-full h-auto object-cover"
        />
        <div className="flex space-y-2 flex-col text-center md:text-left">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Who We Are
          </p>
          <p className="text-base sm:text-lg">
            TecHub is a tech-driven community built by passionate innovators. We
            started with the goal of providing internships, skill-building
            programs, and practical exposure for students.
          </p>
          <p className="text-base sm:text-lg">
            In the future, we plan to expand into hosting hackathons, workshops,
            and live classes to empower the next generation of developers.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <WeDo />
      </div>
      <div className="mt-10">
        <OurTec />
      </div>
    </div>
  );
};

export default AboutUs;
