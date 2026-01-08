import React from "react";

const WeDo = () => {
  const imp = [
    {
      title: "Internships",
      description:
        "Hands-on industry experience with real projects and mentorship.",
      icon: "",
    },
    {
      title: "Hackathons",
      description:
        "Collaborative coding competitions to solve real-world challenges.",
      icon: (
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 20 20"
          fill="#9810fa"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.25 10C1.25 14.8325 5.16751 18.75 10 18.75C14.8325 18.75 18.75 14.8325 18.75 10C18.75 5.16751 14.8325 1.25 10 1.25C5.16751 1.25 1.25 5.16751 1.25 10ZM17.25 10C17.25 14.0041 14.0041 17.25 10 17.25C5.99594 17.25 2.75 14.0041 2.75 10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10Z"
            fill="#9810fa"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.25 10C6.25 14.5222 7.74111 18.25 10 18.25C12.2589 18.25 13.75 14.5222 13.75 10C13.75 5.47778 12.2589 1.75 10 1.75C7.74111 1.75 6.25 5.47778 6.25 10ZM12.25 10C12.25 13.7621 11.0548 16.75 10 16.75C8.94518 16.75 7.75 13.7621 7.75 10C7.75 6.23795 8.94518 3.25 10 3.25C11.0548 3.25 12.25 6.23795 12.25 10Z"
            fill="#9810fa"
          />
          <path
            d="M3.60174 5.46733L4.60789 4.35483C4.70859 4.4459 4.817 4.53499 4.9328 4.62175C6.2041 5.57424 8.2323 6.16108 10.4482 6.16108C12.3391 6.16108 14.1005 5.73495 15.3792 5.00363C15.687 4.82759 15.9613 4.63663 16.1979 4.43451L17.1722 5.57496C16.8622 5.83981 16.511 6.08431 16.1239 6.3057C14.6076 7.17293 12.5898 7.66108 10.4482 7.66108C7.92613 7.66108 5.58282 6.98307 4.03339 5.82219C3.88117 5.70814 3.73712 5.58977 3.60174 5.46733Z"
            fill="#9810fa"
          />
          <path
            d="M3.60174 14.5486L4.60789 15.6611C4.70859 15.57 4.817 15.4809 4.9328 15.3941C6.2041 14.4417 8.2323 13.8548 10.4482 13.8548C12.3391 13.8548 14.1005 14.2809 15.3792 15.0123C15.687 15.1883 15.9613 15.3793 16.1979 15.5814L17.1722 14.4409C16.8622 14.1761 16.511 13.9316 16.1239 13.7102C14.6076 12.843 12.5898 12.3548 10.4482 12.3548C7.92613 12.3548 5.58282 13.0328 4.03339 14.1937C3.88117 14.3078 3.73712 14.4261 3.60174 14.5486Z"
            fill="#9810fa"
          />
          <path d="M1.75 10.75V9.25H18.25V10.75H1.75Z" fill="#9810fa" />
        </svg>
      ),
    },
    {
      title: "Classes",
      description:
        "Future-ready courses in tech, designed to make you job-ready.",
      icon: "",
    },
  ];
  return (
    <div>
      <h7 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center flex mt-12">
        {" "}
        What We DO
      </h7>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 sm:m-10 bg-white rounded-lg">
        {imp.map((item, index) => (
          <div
            key={index}
            className="bg-purple-100 flex flex-col gap-2.5 items-center p-4 sm:p-6 shadow-2xl shadow-gray-300 rounded-lg hover:shadow-xl"
          >
            <div className="bg-linear-to-br from-blue-100 via-purple-200 to bg-blue-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex justify-center items-center hover:rotate-45 ">
              {item.icon}
            </div>
            <p className="font-bold text-lg sm:text-xl">{item.title}</p>
            <p className="text-sm sm:text-base text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeDo;
