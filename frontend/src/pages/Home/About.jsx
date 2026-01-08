import React from "react";
import tec from "../../../Images/AboutTec.png";
const About = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-8 px-4 sm:px-6 lg:px-8 xl:px-16 mt-10 mb-10">
      <div className="w-full md:w-1/2 pt-4 md:pt-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
          About{" "}
          <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent ">
            TecHub
          </span>
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          repellendus ipsum in! Vel, sunt recusandae? Totam molestiae, eligendi
          quae, animi ex reprehenderit a minus, neque excepturi reiciendis velit
          magni odio.
        </p>
        <button className="bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 px-5 sm:px-6 py-2.5 sm:py-3  rounded-xl font-semibold text-white hover:border-purple-700 hover:border hover:bg-none hover:text-purple-900 transition">
          Learn More
        </button>
      </div>
      <div className="w-full md:w-1/2 hover:shadow-lg">
        <img
          src={tec}
          alt=""
          className="h-96 rounded-2xl w-full hover:shadow-2xl hover:shadow-purple-700"
        />
      </div>
    </div>
  );
};

export default About;
