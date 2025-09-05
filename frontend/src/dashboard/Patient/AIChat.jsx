import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../axiosConfig";

const AIChat = ({ showAIChat, setShowAIChat }) => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! 👋 I'm Dr. AI, your health assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add patient message
    setMessages((prev) => [...prev, { sender: "patient", text: input }]);
    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/api/ai/assistant",
        { message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const reply = res.data.reply || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Error fetching AI response" }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!showAIChat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col h-[80vh] max-h-[600px]">
        
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-800">AI Health Assistant</h3>
          <button
            onClick={() => setShowAIChat(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Messages Container - Fixed height with scrolling */}
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
              <strong>{msg.sender === "ai" ? "Dr. AI: " : "You: "}</strong> {msg.text}
            </div>
          ))}
          
          {loading && (
            <div className="p-3 rounded-lg bg-blue-50 text-gray-500 self-start">
              <strong>Dr. AI: </strong> 
              <span className="inline-flex items-center">
                Typing
                <span className="ml-1 inline-flex">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              </span>
            </div>
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your symptoms or medicine..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center p-2 border-t flex-shrink-0">
          ⚠️ Dr. AI is a virtual assistant. Always consult a licensed doctor for medical advice.
        </div>
      </div>
    </div>
  );
};

export default AIChat;