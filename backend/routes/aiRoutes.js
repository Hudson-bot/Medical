const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/assistant", async (req, res) => {
  try {
    const { message, query } = req.body;
    const userInput = message ?? query;

    if (!userInput) {
      return res.status(400).json({
        success: false,
        reply: "Missing 'message' in request body",
      });
    }

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://medical-8q9q.onrender.com", // your site URL
        "X-Title": "Medical Assistant App",       // your app name
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free", // you can swap with gpt/claude/mistral
        messages: [
          {
            role: "system",
            content: "You are Dr. AI, a professional medical assistant. " +
                     "Provide helpful, accurate, and safe advice. " +
                     "Always ask clarifying questions before giving an answer, " +
                     "and remind patients to consult a real doctor for emergencies.",
          },
          { role: "user", content: userInput },
        ],
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);
      return res.status(500).json({
        success: false,
        reply: data.error?.message || "AI Assistant is unavailable right now.",
      });
    }

    res.json({
      success: true,
      reply: data.choices[0].message.content,
    });

  } catch (error) {
    console.error("AI Assistant error:", error);
    res.status(500).json({
      success: false,
      reply: "AI Assistant is unavailable right now.",
    });
  }
});

module.exports = router;
