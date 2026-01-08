import React from "react";
import Benefit from "./Benefit";

const Internship = () => {
  return (
    <div className="bg-linear-to-br from-blue-50 via-white to purple-50 px-4 md:px-12 lg:px-24">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center pt-8 pb-6 px-2 md:px-0">
          Our{" "}
          <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Internship Benefits
          </span>{" "}
        </h2>
        <p className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 text-center mx-auto text-sm sm:text-base md:text-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          blanditiis ad fuga debitis obcaecati ducimus nulla illo, pariatur
          deleniti, porro exercitationem ipsam modi quam sunt aliquid! Doloribus
          sint eius maiores?
        </p>
      </div>
      <div className="mt-8 px-2 sm:px-6 md:px-12 lg:px-24 ">
        <Benefit />
      </div>
    </div>
  );
};

export default Internship;
