import axios from "axios";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1";
const API_KEY = import.meta.env.VITE_API_KEY;

export const sendMessageToDeepSeek = async (
  messages: Array<{ role: string; content: string }>,
  config: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
) => {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: config.model || "deepseek-chat",
        messages,
        temperature: config.temperature || 0.7,
        max_tokens: config.max_tokens || 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    throw error;
  }
};

