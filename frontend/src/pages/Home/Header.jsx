import React from "react";

const Header = () => {
  return (
    <div className="bg-gray-100">
      <div className=" pt-20 pb-20 flex flex-col w-full sm:w-4/5 lg:w-1/2 m-auto space-y-6 items-center">
        <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center px-4 sm:px-6">
          Empowering Future with{" "}
          <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">

            TecHub
          </span>{" "}
        </h2>
        <div>
          <ul className="flex flex-col sm:flex-row text-lg sm:text-xl text-gray-500 text-center space-y-1 sm:space-y-0 sm:space-x-2 mb-4">
            <li>• Software Solutions </li>
            <li>• Internship Training </li>
            <li>• Future Courses</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <button className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2.5 rounded-xl font-semibold text-white">
            Explore Internships
          </button>
          <button className="hover:bg-purple-600 px-4 py-2.5 rounded-xl border border-purple-600 text-purple-600 hover:text-white">
            My Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
