import React from "react";
import Header from "./Header";
const LandingPage = () => {
  return (
    <div>
      <Header />
      <p className="text-center text-sm sm:text-base md:text-lg m-8">
        Still have questions?{" "}
        <span className="text-purple-600 font-bold">Connect with us</span> —
        we’re happy to help!
      </p>
    </div>
  );
};
export default LandingPage;
