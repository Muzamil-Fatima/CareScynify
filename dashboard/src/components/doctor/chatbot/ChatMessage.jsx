import React from "react";
import { Bot, User } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isUser = message?.role === "user";

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI AVATAR */}

      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 ring-1 ring-violet-200">
          <Bot className="h-5 w-5 text-violet-600" />
        </div>
      )}

      {/* MESSAGE */}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? "rounded-br-md bg-violet-600 text-white shadow-violet-100"
            : "rounded-bl-md border border-violet-100 bg-white text-gray-800"
        }`}
      >
        <p className="whitespace-pre-wrap wrap-break-word">
          {message?.content || ""}
        </p>
      </div>

      {/* USER AVATAR */}

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 ring-1 ring-violet-200">
          <User className="h-5 w-5 text-violet-600" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
