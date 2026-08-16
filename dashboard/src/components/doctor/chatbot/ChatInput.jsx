import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, loading = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    try {
      await onSend(trimmedMessage);
      setMessage("");
    } catch (error) {
      console.error("Chat send error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-violet-100 bg-white p-4"
    >
      <div className="flex items-end gap-3">
        {/* Input */}
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about your medical documents..."
            rows={1}
            disabled={loading}
            className="max-h-32 min-h-11 w-full resize-none rounded-xl border border-violet-200 bg-violet-50/30 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <p className="mt-1 px-1 text-xs text-gray-400">
            Press Enter to send • Shift + Enter for a new line
          </p>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || loading}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          title="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;