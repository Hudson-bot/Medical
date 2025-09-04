// src/components/AIChat.jsx
import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";

const AIChat = ({ showAIChat, setShowAIChat }) => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! 👋 I'm your health assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add patient message
    setMessages((prev) => [...prev, { sender: "patient", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/api/ai/assistant",
        { query: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const reply = res.data.reply || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Error fetching AI response" }]);
    }
  };

  if (!showAIChat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">AI Health Assistant</h3>
          <button
            onClick={() => setShowAIChat(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "ai"
                  ? "bg-blue-100 text-gray-800 self-start"
                  : "bg-green-100 text-gray-800 self-end ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about your medicine..."
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
