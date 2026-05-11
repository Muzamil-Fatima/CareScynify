import React, { useState } from "react";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

const DoctorQuestions = ({ doctor }) => {
  const [question, setQuestion] = useState("");

  const questions = doctor?.questions || [
    {
      id: 1,
      user: "Ali",
      question: "Is chest pain always related to heart problems?",
      answer:
        "Not always. It can be due to stress, acidity, or muscle strain. Proper diagnosis is important.",
    },
    {
      id: 2,
      user: "Sara",
      question: "How often should I visit a cardiologist?",
      answer:
        "If you are healthy, once a year checkup is enough. If you have symptoms, visit immediately.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    alert(`Question submitted: ${question}`);
    setQuestion("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">
      
      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <QuestionAnswerOutlinedIcon fontSize="small" />
        Ask Doctor / Questions
      </h2>

      {/* Ask Question */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your medical question..."
          className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          rows={3}
        />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          Submit Question
        </button>
      </form>

      {/* Questions List */}
      <div className="space-y-4 pt-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="border border-gray-100 rounded-xl p-4 bg-gray-50"
          >
            
            {/* Question */}
            <p className="font-medium text-gray-800">
              ❓ {q.question}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Asked by {q.user}
            </p>

            {/* Answer */}
            <div className="mt-3 bg-white p-3 rounded-lg border">
              <p className="text-sm text-gray-700">
                💬 {q.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorQuestions;