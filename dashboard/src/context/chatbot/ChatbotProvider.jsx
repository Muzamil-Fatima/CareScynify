import { useCallback, useState } from "react";

import ChatbotContext from "./ChatbotContext";

import {
  uploadChatbotDocument,
  getChatbotDocuments,
  deleteChatbotDocument,
  sendDoctorChatMessage,
} from "../../api/doctor/chatbotApi";

const ChatbotProvider = ({ children }) => {
  // DOCUMENTS

  const [documents, setDocuments] = useState([]);

  const [documentsLoading, setDocumentsLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [deleting, setDeleting] = useState(false);

  // CHAT

  const [messages, setMessages] = useState([]);

  const [chatLoading, setChatLoading] = useState(false);

  // ERROR

  const [error, setError] = useState(null);

  // GET DOCUMENTS

  const fetchChatbotDocuments = useCallback(async () => {
    try {
      setDocumentsLoading(true);
      setError(null);

      const data = await getChatbotDocuments();

      setDocuments(data?.documents || []);

      return data;
    } catch (error) {
      console.error("Fetch chatbot documents error:", error);

      setError(
        error?.response?.data?.message || "Failed to load chatbot documents",
      );

      throw error;
    } finally {
      setDocumentsLoading(false);
    }
  }, []);

  // UPLOAD DOCUMENT

  const uploadDocument = async (file, onProgress) => {
    try {
      if (!file) {
        throw new Error("Please select a PDF file");
      }

      if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
      ) {
        throw new Error("Only PDF files are allowed");
      }

      setUploading(true);
      setError(null);

      
      // SEND FILE + PROGRESS CALLBACK TO API
      

      const data = await uploadChatbotDocument(file, onProgress);

      
      // ADD NEW DOCUMENT TO LIST
      

      if (data?.document) {
        setDocuments((prev) => [data.document, ...prev]);
      }

      return data;
    } catch (error) {
      console.error("Upload chatbot document error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to upload document";

      setError(message);

      throw error;
    } finally {
      setUploading(false);
    }
  };

  // DELETE DOCUMENT

  const removeDocument = async (documentId) => {
    try {
      if (!documentId) {
        throw new Error("Document ID is required");
      }

      setDeleting(true);
      setError(null);

      const data = await deleteChatbotDocument(documentId);

      setDocuments((prev) =>
        prev.filter((document) => document._id !== documentId),
      );

      return data;
    } catch (error) {
      console.error("Delete chatbot document error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete document";

      setError(message);

      throw error;
    } finally {
      setDeleting(false);
    }
  };

  // SEND CHAT MESSAGE

  const sendMessage = async (question) => {
    const trimmedQuestion = question?.trim();

    if (!trimmedQuestion) {
      return;
    }

    
    // ADD USER MESSAGE IMMEDIATELY
    

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setChatLoading(true);
      setError(null);

      const data = await sendDoctorChatMessage(trimmedQuestion);

      
      // ADD BOT RESPONSE
      

      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data?.answer || "I could not generate an answer.",
      };

      setMessages((prev) => [...prev, botMessage]);

      return data;
    } catch (error) {
      console.error("Doctor chatbot error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get chatbot response";

      setError(message);

      
      // ADD ERROR MESSAGE TO CHAT
      

      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, I was unable to process your question.",
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);

      throw error;
    } finally {
      setChatLoading(false);
    }
  };

  // CLEAR CHAT

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  // CLEAR ERROR

  const clearError = () => {
    setError(null);
  };

  // CONTEXT VALUE

  const value = {
    // Documents
    documents,
    documentsLoading,
    uploading,
    deleting,

    // Chat
    messages,
    chatLoading,

    // Error
    error,

    // Functions
    fetchChatbotDocuments,
    uploadDocument,
    removeDocument,
    sendMessage,
    clearChat,
    clearError,
  };

  // PROVIDER

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
