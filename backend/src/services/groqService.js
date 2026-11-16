// groqService.js

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * messages  → full array: [{ role, content }, ...]
 *             (system prompt already included by the frontend)
 * model     → groq model string (forwarded from frontend)
 * max_tokens, temperature → forwarded from frontend
 */
export const generateChatResponse = async ({
  messages,
  model = "llama-3.1-8b-instant",
  max_tokens = 500,
  temperature = 0.7,
}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens,
        temperature,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq API error ${response.status}: ${err}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};
