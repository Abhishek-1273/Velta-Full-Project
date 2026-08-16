// chat.controller.js
import { generateChatResponse } from "../services/groqService.js";
import { SYSTEM_PROMPT } from "../config/systemPrompt.js";

export const chatHandler = async (req, res) => {
  try {
    const { messages } = req.body;

    // Basic validation — frontend must send a messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    // Prepend system prompt securely on the backend and strip any system prompt from client
    const sanitizedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.filter((m) => m && m.role !== "system"),
    ];

    const data = await generateChatResponse({
      messages: sanitizedMessages,
      model: "llama-3.1-8b-instant",
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json(data);
  } catch (error) {
    console.error("[chatHandler]", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
