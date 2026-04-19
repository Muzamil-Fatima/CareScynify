import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ChatBotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi 👋 I am your AI Health Assistant. Ask me anything!" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };

    // Simple fake AI response (you will replace with backend later)
    const botReply = {
      type: "bot",
      text: "I understand your query. In real system, AI API will respond here.",
    };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl border z-50 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b bg-purple-600 text-white rounded-t-2xl">
        <h2 className="font-semibold">AI Health Chat</h2>
        <button onClick={onClose}>
          <CloseOutlinedIcon />
        </button>
      </div>

      {/* Messages */}
      <div className="p-3 h-80 overflow-y-auto space-y-2 text-sm">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.type === "user"
                ? "ml-auto bg-purple-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}

      </div>

      {/* Input */}
      <div className="p-2 border-t flex gap-2">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask health question..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-3 rounded-lg text-sm"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatBotModal;