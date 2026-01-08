import React from "react";
import Program from "./Program";
import CourseCard from "./CourseCard";
import coursesData from "./Courses.json";

const Opportunity = () => {
  return (
    <div>
      <div>
        <Program />
      </div>
      <div className="bg-gray-300 pt-8">
        <h2 className="text-4xl font-extrabold text-center mt-4 mb-6 flex justify-center m-auto">
          Training and{" "}
          <span className="bg-linear-to-r from-indigo-500 via-purple-700 to-pink-600 bg-clip-text text-transparent ml-2">
            Internship Opportunities
          </span>{" "}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-12 max-w-7xl mx-auto">
          {coursesData.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        <div className="h-32"></div>
      </div>
    </div>
  );
};

export default Opportunity;
