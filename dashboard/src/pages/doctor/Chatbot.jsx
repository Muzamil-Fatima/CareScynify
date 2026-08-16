import React, { useEffect } from "react";

import ChatbotUpload from "../../components/doctor/chatbot/ChatbotUpload";
import ChatbotList from "../../components/doctor/chatbot/ChatbotList";
import ChatWindow from "../../components/doctor/chatbot/ChatWindow";

import { useChatBot } from "../../context/chatbot/ChatbotContext";

const Chatbot = () => {
  const {
    // DOCUMENTS

    documents,
    documentsLoading,
    uploading,
    deleting,

    // CHAT

    messages,
    chatLoading,
    sendMessage,

    // ERROR

    error,
    clearError,

    // DOCUMENT ACTIONS

    fetchChatbotDocuments,
    uploadDocument,
    removeDocument,
  } = useChatBot();

  // LOAD DOCTOR DOCUMENTS

  useEffect(() => {
    fetchChatbotDocuments();
  }, [fetchChatbotDocuments]);

  // UPLOAD DOCUMENT

  const handleUpload = async (file, onProgress) => {
    try {
      if (!file) {
        throw new Error("Please select a PDF file");
      }

      /*
       * IMPORTANT:
       *
       * ChatbotUpload sends:
       *
       * onUpload(file, onProgress)
       *
       * So we forward both values to Context.
       */

      return await uploadDocument(file, onProgress);
    } catch (error) {
      console.error("Chatbot upload error:", error);

      throw error;
    }
  };

  // DELETE DOCUMENT

  const handleDelete = async (file) => {
    try {
      if (!file?._id) {
        throw new Error("Document ID is missing");
      }

      await removeDocument(file._id);
    } catch (error) {
      console.error("Chatbot delete error:", error);
    }
  };

  // VIEW DOCUMENT

  const handleView = (file) => {
    if (!file?.fileUrl) return;

    const fullUrl = file.fileUrl.startsWith("http")
      ? file.fileUrl
      : `${import.meta.env.VITE_BASE_URL}${file.fileUrl}`;

    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  // SEND CHAT MESSAGE

  const handleSendMessage = async (message) => {
    try {
      const trimmedMessage = message?.trim();

      if (!trimmedMessage) {
        return;
      }

      await sendMessage(trimmedMessage);
    } catch (error) {
      console.error("Chatbot message error:", error);
    }
  };

  // UI

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Medical Knowledge Base
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your medical documents and chat with your AI medical
            assistant.
          </p>
        </div>

        {/* AI CHAT SECTION */}

        <div className="mb-6 mt-8">
          <ChatWindow
            messages={messages}
            onSend={handleSendMessage}
            loading={chatLoading}
          />
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={clearError}
              className="font-medium hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* UPLOAD SECTION */}

        <ChatbotUpload onUpload={handleUpload} uploading={uploading} />

        {/* DOCUMENTS SECTION */}

        <div className="mt-8">
          <ChatbotList
            files={documents}
            loading={documentsLoading}
            deleting={deleting}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
