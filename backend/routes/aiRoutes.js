// routes/aiRoutes.js
import express from "express";
import OpenAI from "openai"; // npm install openai

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/assistant", async (req, res) => {
  try {
    const { query } = req.body;
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-3.5-turbo if cheaper
      messages: [{ role: "user", content: query }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI Assistant is unavailable right now." });
  }
});

export default router;
