import React, { useState } from "react";

const DoctorSidePanel = ({ doctor }) => {
  const [question, setQuestion] = useState("");

  return (
    <div className="space-y-4 sticky top-24">

      {/* ---------------- ASK DOCTOR ---------------- */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-3">
          💬 Ask Doctor
        </h2>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write your question..."
          className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-300 outline-none"
          rows={3}
        />

        <button
          className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm"
          onClick={() => {
            if (!question.trim()) return;
            alert("Question sent to doctor");
            setQuestion("");
          }}
        >
          Submit Question
        </button>
      </div>

      {/* ---------------- QUICK INFO ---------------- */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-3">
          📌 Quick Info
        </h2>

        <p className="text-sm text-gray-600">
          📍 {doctor?.workplaces?.[0]?.location}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          💰 Fee: Rs {doctor?.workplaces?.[0]?.settings?.appointmentFee}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          ⏱ Duration: {doctor?.workplaces?.[0]?.settings?.appointmentDuration?.value} min
        </p>
      </div>

    </div>
  );
};

export default DoctorSidePanel;