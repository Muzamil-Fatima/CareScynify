import React from "react";
import Message from "./Message";
import GetInTouch from "./GetInTouch";
const ContactInfo = () => {
  return (
    <div>
      <div className="  bg-linear-to-r from-indigo-700 via-purple-800 to-pink-700 py-10 sm:py-16 md:py-20 text-white">
        <h6 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold">
          Get in <span className="text-yellow-500"> Touch</span>
        </h6>
        <p className="text-center px-4 sm:px-6 md:px-20 lg:px-40">
          Have questions, ideas, or want to work with us? We’d love to hear from
          you.
        </p>
      </div>
      <div className="bg-gray-100">
        <Message />
      </div>
      <div>
        <GetInTouch />
      </div>
    </div>
  );
};

export default ContactInfo;
