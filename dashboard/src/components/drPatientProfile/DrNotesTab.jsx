import React, { useState } from "react";
import {
  FaNotesMedical,
  FaRegCalendarAlt,
  FaUserMd,
} from "react-icons/fa";

const DrNotesTab = () => {
  const [note, setNote] = useState("");

  // Dummy data (replace with API data)
  const notes = [
    {
      id: 1,
      doctor: "Dr. Ahmed",
      date: "28 Jun 2026",
      note:
        "Patient recovering well. Continue current medications and schedule a follow-up visit after one week.",
    },
    {
      id: 2,
      doctor: "Dr. Ahmed",
      date: "20 Jun 2026",
      note:
        "Patient reported mild headache. Recommended adequate hydration and monitoring blood pressure.",
    },
  ];

  const handleSave = () => {
    if (!note.trim()) return;

    console.log(note);

    // TODO:
    // POST /doctor/notes

    setNote("");
  };

  return (
    <div className="space-y-8">
      {/* Add Note */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <FaNotesMedical className="text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Doctor Notes
            </h2>
            <p className="text-sm text-gray-500">
              Private notes visible only to doctors.
            </p>
          </div>
        </div>

        <textarea
          rows={7}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your observations, diagnosis, follow-up instructions or any private note..."
          className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {note.length} / 1000 characters
          </span>

          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition"
          >
            Save Note
          </button>
        </div>
      </div>

      {/* Previous Notes */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Previous Notes
        </h2>

        {notes.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No doctor notes available.
          </div>
        ) : (
          <div className="space-y-5">
            {notes.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                      <FaUserMd className="text-indigo-600" />
                      {item.doctor}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaRegCalendarAlt />
                      {item.date}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-7">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrNotesTab;