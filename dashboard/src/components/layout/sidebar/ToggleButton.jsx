import React from "react";
const ToggleButton = ({isOpen, setIsOpen}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-2 p-4">
        {" "}
        <button className=" text-3xl" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default ToggleButton;
