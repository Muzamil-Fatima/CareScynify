import React from "react";
import Header from "./Header";
import About from "./About";
import Internship from "./Internship";
import TecHub from "./TecHub";
import Future from "./Future";
import Certificate from "./Certificate";
import Vision from "./Vision";
import Question from "./Question";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <About />
      <Internship />
      <TecHub />
      <Future />
      <Certificate />
      <Vision />
      <Question />
      <p className="text-center text-sm sm:text-base md:text-lg m-8">
        Still have questions? <span className="text-purple-600 font-bold">Connect with us</span> — we’re happy to
        help!
      </p>
    </div>
  );
};

export default LandingPage;
