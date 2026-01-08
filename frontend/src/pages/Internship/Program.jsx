import React from "react";

const Program = () => {
  return (
    <div className="bg-linear-to-r from-indigo-700 via-purple-700 to-purple-800 p-6 sm:p-10 text-white flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
          Kickstart Your Career with{" "}
          <span className="text-pink-500">
            Practical Training and Internship Programs
          </span>{" "}
        </p>
        <p className="text-center text-base sm:text-lg lg:text-xl">
          Real projects, expert mentorship, and hands-on experience to boost
          your career.
        </p>
        <p className="text-center text-sm sm:text-base lg:text-lg mt-2">
          "The best way to learn is by doing."
        </p>
        <button className="bg-white px-4 sm:px-6 rounded-full py-2 sm:py-3 text-blue-800  transform transition duration-200 hover:scale-105 font-medium mx-auto mt-6">
          Explore Opportunities
        </button>
      </div>
    </div>
  );
};

export default Program;
