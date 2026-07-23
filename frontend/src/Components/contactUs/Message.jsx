import React from "react";

const Message = () => {
  return (
    <div className="p-4 sm:p-8 md:p-20">
      <div className="bg-white w-full sm:w-10/12 md:w-8/12  rounded-2xl flex justify-center m-auto hover:shadow-2xl shadow-purple-200">
        <div className="flex flex-col space-y-2.5 w-full m-6">
          <h6 className="text-2xl sm:text-3xl md:text-4xl  font-bold mb-3 text-center justify-center flex mt-6 sm:mt-8  text-gray-600">
            Send Us a Message
          </h6>
          <label htmlFor="" className="font-bold text-gray-600">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="border border-gray-400 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base"
          />
          <label htmlFor="" className="font-bold text-gray-600">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="border border-gray-400 rounded-lg px-2 py-2.5"
          />

          <label htmlFor="" className="font-bold text-gray-600">
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="Enter Your Mobile Number"
            className="border border-gray-400 rounded-lg px-2 py-2.5"
          />

          <label htmlFor="" className="font-bold text-gray-600">
            Enter a Query
          </label>
          <textarea
            type="text"
            placeholder="Enter Your Message"
            className="border border-gray-400 rounded-lg px-2 py-2.5"
          />
          <button className="bg-blue-700 hover:border-2 hover:border-black py-2 sm:py-3 rounded-2xl text-base sm:text-lg md:text-xl text-white mb-8 mt-6 w-full sm:w-auto">
            Send a Message{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
