import { api } from "../axios";




// UPLOAD DOCTOR CHATBOT PDF


export const uploadChatbotDocument = async (file, onProgress) => {
  if (!file) {
    throw new Error("PDF file is required");
  }

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/api/doctor/chatbot/documents",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      
      // REAL BROWSER -> BACKEND UPLOAD PROGRESS
      

      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) {
          return;
        }

        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        // Never tell UI 100% until backend response arrives
        const safePercent = Math.min(percent, 99);

        if (typeof onProgress === "function") {
          onProgress(safePercent);
        }
      },
    }
  );

  
  // BACKEND SUCCESS
  

  if (typeof onProgress === "function") {
    onProgress(100);
  }

  return response.data;
};


// GET DOCTOR CHATBOT DOCUMENTS


export const getChatbotDocuments = async () => {
  const response = await api.get(
    "/api/doctor/chatbot/documents"
  );

  return response.data;
};


// DELETE DOCTOR CHATBOT DOCUMENT


export const deleteChatbotDocument = async (documentId) => {
  if (!documentId) {
    throw new Error("Document ID is required");
  }

  const response = await api.delete(
    `/api/doctor/chatbot/documents/${documentId}`
  );

  return response.data;
};


// DOCTOR CHATBOT



// CHAT WITH DOCTOR MEDIBOT


export const sendDoctorChatMessage = async (question) => {
  if (!question || !question.trim()) {
    throw new Error("Question is required");
  }

  const response = await api.post(
    "/api/doctor/chatbot/chat",
    {
      question: question.trim(),
    }
  );

  return response.data;
};