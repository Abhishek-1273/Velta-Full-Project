// chat.controller.js
import { generateChatResponse } from "../services/groqService.js";

export const chatHandler = async (req, res) => {
  try {
    const { messages, model, max_tokens, temperature } = req.body;

    // Basic validation — frontend must send a messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const data = await generateChatResponse({
      messages,
      model,
      max_tokens,
      temperature,
    });

    res.json(data);
  } catch (error) {
    console.error("[chatHandler]", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
