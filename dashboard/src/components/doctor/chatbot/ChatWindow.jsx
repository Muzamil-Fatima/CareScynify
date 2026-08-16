import React, { useEffect, useRef } from "react";
import { Bot, MessageCircle } from "lucide-react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatWindow = ({ messages = [], onSend, loading = false }) => {
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-162.5 flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
      {/* HEADER */}

      <div className="flex items-center gap-3 border-b border-violet-100 bg-white px-6 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <Bot className="h-6 w-6 text-violet-600" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            AI Medical Assistant
          </h2>

          <p className="text-xs text-gray-500">
            Ask questions based on your uploaded medical documents
          </p>
        </div>

        {/* Online Indicator */}
        <div className="ml-auto flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-xs font-medium text-gray-500">Ready</span>
        </div>
      </div>

      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto bg-linear-to-b from-violet-50/40 to-gray-50 px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            {/* AI Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 ring-8 ring-violet-50">
              <MessageCircle className="h-8 w-8 text-violet-600" />
            </div>

            <h3 className="mt-5 text-base font-semibold text-gray-900">
              Start a conversation
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Ask questions about the medical information contained in your
              uploaded documents.
            </p>

            {/* Suggestions */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onSend?.("What are the main topics covered in my documents?")
                }
                disabled={loading}
                className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                What do my documents contain?
              </button>

              <button
                type="button"
                onClick={() =>
                  onSend?.("Summarize the important medical information.")
                }
                disabled={loading}
                className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Summarize my documents
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-5">
            {/* Messages */}
            {messages.map((message, index) => (
              <ChatMessage
                key={message._id || message.id || index}
                message={message}
              />
            ))}

            {/* AI LOADING */}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100">
                  <Bot className="h-5 w-5 text-violet-600" />
                </div>

                <div className="rounded-2xl rounded-bl-md border border-violet-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
                      style={{ animationDelay: "0.15s" }}
                    />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* INPUT */}

      <ChatInput onSend={onSend} loading={loading} />
    </div>
  );
};

export default ChatWindow;
