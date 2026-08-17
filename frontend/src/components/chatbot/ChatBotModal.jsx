// import React, { useState, useEffect, useRef } from "react";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import { sendChatbotMessage } from "../../api/patientChatbotApi";

// const ChatBotModal = ({ onClose }) => {
//   const [messages, setMessages] = useState([
//     {
//       type: "bot",
//       text: "Hi 👋 I am your CareScynify Patient Assistant. I can help you find doctors and check appointment availability.",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef(null);
//   // Reference to messages container
//   const messagesEndRef = useRef(null);

//   // Automatically scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, loading]);

//   const handleSend = async () => {
//     if (!input.trim() || loading) return;

//     const userText = input.trim();

//     setMessages((prev) => [
//       ...prev,
//       {
//         type: "user",
//         text: userText,
//       },
//     ]);

//     setInput("");

//     // Keep input focused
//     requestAnimationFrame(() => {
//       inputRef.current?.focus();
//     });

//     setLoading(true);

//     try {
//       const response = await sendChatbotMessage(userText);

//       const botData = response?.data;

//       setMessages((prev) => [
//         ...prev,
//         {
//           type: "bot",
//           text:
//             botData?.message || "Sorry, I could not understand your request.",
//           data: botData,
//         },
//       ]);
//     } catch (error) {
//       console.error("Chatbot Error:", error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           type: "bot",
//           text: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);

//       // Focus again after response
//       requestAnimationFrame(() => {
//         inputRef.current?.focus();
//       });
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };

//   return (
//     <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
//       {/* Header */}
//       <div className="flex justify-between items-center p-3 bg-purple-600 text-white">
//         <h2 className="font-semibold">CareScynify Assistant</h2>

//         <button onClick={onClose}>
//           <CloseOutlinedIcon />
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="p-3 h-80 overflow-y-auto space-y-3 text-sm">
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <div
//               className={`p-2 rounded-lg max-w-[85%] ${
//                 msg.type === "user"
//                   ? "ml-auto bg-purple-600 text-white"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>

//             {/* Doctor results */}
//             {msg.data?.type === "doctors" && msg.data?.doctors?.length > 0 && (
//               <div className="mt-2 space-y-2">
//                 {msg.data.doctors.map((doctor) => (
//                   <div
//                     key={doctor.id}
//                     className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm"
//                   >
//                     <p className="font-semibold">Dr. {doctor.name}</p>

//                     <p className="text-xs text-gray-500">{doctor.specialty}</p>

//                     {doctor.rating > 0 && (
//                       <p className="text-xs mt-1">⭐ {doctor.rating}</p>
//                     )}

//                     {doctor.consultationFee && (
//                       <p className="text-xs">
//                         Fee: Rs. {doctor.consultationFee}
//                       </p>
//                     )}

//                     <button className="mt-2 w-full bg-purple-600 text-white rounded-md py-1 text-xs">
//                       Check Availability
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Appointment slots */}
//             {msg.data?.type === "slots" && msg.data?.slots?.length > 0 && (
//               <div className="mt-2 space-y-2">
//                 {msg.data.slots.map((slot, slotIndex) => (
//                   <button
//                     key={slotIndex}
//                     className="w-full border border-purple-200 rounded-lg px-3 py-2 text-left hover:bg-purple-50"
//                   >
//                     {slot.time || slot.label || slot}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}

//         {/* Loading */}
//         {loading && (
//           <div className="bg-gray-100 text-gray-500 p-2 rounded-lg w-fit">
//             Checking...
//           </div>
//         )}

//         {/* Invisible element at bottom */}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-2 border-t border-gray-200 flex gap-2">
//         <input
//           ref={inputRef}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Find a doctor or check availability..."
//           className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
//         />

//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-3 rounded-lg text-sm"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBotModal;
import React, { useState, useEffect, useRef, useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { sendChatbotMessage } from "../../api/patientChatbotApi";
import { AuthContext } from "../../context/auth/AuthContext";

const ChatBotModal = ({ onClose }) => {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi 👋 I am your CareScynify Patient Assistant. I can help you find doctors and check appointment availability.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Focus input when chatbot opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Automatically scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    // Add user's message
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userText,
      },
    ]);

    setInput("");

    // ==========================================
    // CHECK LOGIN
    // ==========================================

    if (!user) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Please create an account or login first to use the CareScynify Patient Assistant and access doctor information and appointment availability.",
          action: "LOGIN_REQUIRED",
        },
      ]);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });

      return;
    }

    // ==========================================
    // SEND TO BACKEND
    // ==========================================

    setLoading(true);

    try {
      const response = await sendChatbotMessage(userText);

      const botData = response?.data;

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            botData?.message ||
            "Sorry, I could not understand your request.",
          data: botData,
        },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            error?.response?.data?.message ||
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-purple-600 text-white">
        <h2 className="font-semibold">
          CareScynify Assistant
        </h2>

        <button onClick={onClose}>
          <CloseOutlinedIcon />
        </button>
      </div>

      {/* Messages */}
      <div className="p-3 h-80 overflow-y-auto space-y-3 text-sm">

        {messages.map((msg, index) => (
          <div key={index}>

            <div
              className={`p-2 rounded-lg max-w-[85%] ${
                msg.type === "user"
                  ? "ml-auto bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>

            {/* Login / Register buttons */}
            {msg.action === "LOGIN_REQUIRED" && (
              <div className="flex gap-2 mt-2">

                <button
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  className="flex-1 bg-purple-600 text-white rounded-md py-2 text-xs hover:bg-purple-700"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                  className="flex-1 border border-purple-600 text-purple-600 rounded-md py-2 text-xs hover:bg-purple-50"
                >
                  Create Account
                </button>

              </div>
            )}

            {/* Doctor results */}
            {msg.data?.type === "doctors" &&
              msg.data?.doctors?.length > 0 && (
                <div className="mt-2 space-y-2">

                  {msg.data.doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm"
                    >
                      <p className="font-semibold">
                        Dr. {doctor.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {doctor.specialty}
                      </p>

                      {doctor.rating > 0 && (
                        <p className="text-xs mt-1">
                          ⭐ {doctor.rating}
                        </p>
                      )}

                      {doctor.consultationFee && (
                        <p className="text-xs">
                          Fee: Rs. {doctor.consultationFee}
                        </p>
                      )}

                      <button
                        className="mt-2 w-full bg-purple-600 text-white rounded-md py-1 text-xs"
                      >
                        Check Availability
                      </button>
                    </div>
                  ))}

                </div>
              )}

            {/* Appointment slots */}
            {msg.data?.type === "slots" &&
              msg.data?.slots?.length > 0 && (
                <div className="mt-2 space-y-2">

                  {msg.data.slots.map((slot, slotIndex) => (
                    <button
                      key={slotIndex}
                      className="w-full border border-purple-200 rounded-lg px-3 py-2 text-left hover:bg-purple-50"
                    >
                      {slot.time || slot.label || slot}
                    </button>
                  ))}

                </div>
              )}

          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="bg-gray-100 text-gray-500 p-2 rounded-lg w-fit">
            Checking...
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <div className="p-2 border-t border-gray-200 flex gap-2">

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            user
              ? "Find a doctor or check availability..."
              : "Login to use chatbot..."
          }
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-3 rounded-lg text-sm"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatBotModal;