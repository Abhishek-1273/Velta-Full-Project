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

    // Guard against token-exhaustion attacks & malformed payloads:
    // 1. Only allow 'user' and 'assistant' roles from client
    // 2. Only keep the last 10 messages (avoid unbounded context window costs)
    // 3. Cap each message to 1000 characters
    const allowedRoles = new Set(['user', 'assistant']);
    const sanitizedClientMessages = messages
      .filter((m) => m && allowedRoles.has(m.role) && typeof m.content === 'string')
      .slice(-10)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 1000).trim(),
      }))
      .filter((m) => m.content.length > 0);

    if (sanitizedClientMessages.length === 0) {
      return res.status(400).json({ error: "Valid message content is required" });
    }

    // Prepend system prompt securely on the backend
    const sanitizedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...sanitizedClientMessages,
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
