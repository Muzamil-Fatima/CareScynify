import React, { useState } from "react";

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };
  const dropDown = [
    {
      question: "What services does TecHub provide?",
      answer:
        "TecHub offers internship programs, software development services, career guidance, and upcoming professional tech courses.",
    },
    {
      question: "How do I apply for an internship at TecHub?",
      answer:
        "You can apply directly through the TecHub website by filling out the internship application form. Our team will contact you if you’re shortlisted.",
    },
    {
      question: "Are TecHub internships paid or unpaid?",
      answer:
        "TecHub offers both paid and unpaid internships depending on the program, duration, and skill level of the applicant.",
    },
    {
      question: "Do I need prior experience to join TecHub?",

      answer:
        "No prior experience is required for beginner-friendly programs. However, some advanced tracks may require basic programming knowledge.",
    },
    {
      question: "What technologies does TecHub focus on?",
      answer:
        "TecHub focuses on MERN Stack, Python, Data Science, UI/UX, mobile app development, cloud technologies, and more.",
    },
    {
      question: "Will I receive a certificate after completing an internship?",
      answer:
        "Yes. TecHub provides an officially verified certificate after successfully completing the internship requirements.",
    },
    {
      question: "Does TecHub offer remote learning options?",
      answer:
        "Yes. TecHub provides online training, remote internships, and virtual mentoring opportunities for learners worldwide.",
    },
    {
      question: "How long are the internship programs at TecHub?",

      answer:
        "Internship duration varies from 4 to 12 weeks depending on the track and learning goals.",
    },
    {
      question: "Does TecHub help with job placement?",
      answer:
        "Yes. TecHub assists students with resume building, LinkedIn optimization, mock interviews, and job recommendations.",
    },
  ];

  return (
    <div className="bg-gray-50 px-4 py-6 sm:px-6 md:px-12 lg:px-24 ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Frequently Asked Questions
      </h2>

      <p className="text-gray-400 mb-8 sm:mb-12 md:mb-14  text-center text-sm sm:text-base md:text-lg">
        Have doubts? We’ve got you covered. Here are the answers to the most
        common questions.
      </p>

      {dropDown.map((item, index) => (
        <div
          key={index}
          className={`mb-4 bg-white p-4 rounded shadow w-full sm:w-11/12 md:w-3/4 lg:w-2/3 m-auto transition-all duration-300 ${
            openIndex === index
              ? "border border-purple-500"
              : "border border-transparent"
          }`}
        >
          {/* QUESTION */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggle(index)}
          >
            <p className="font-medium text-sm sm:text-base md:text-lg">
              {item.question}
            </p>

            <svg
              width="24px"
              height="24px"
              viewBox="-6.5 0 32 32"
              fill={openIndex === index ? "#9810fa" : "#000"}
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
            </svg>
          </div>

          {/* ANSWER */}
          {openIndex === index && (
            <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Question;
