import { useState, useRef, useEffect } from "react";
import { sendMessageToDeepSeek } from "../api";
import type { ChatConfig, Message } from "../types/types";

export const useChat = (
  initialConfig: ChatConfig = { model: "deepseek-ai/DeepSeek-R1" }
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ChatConfig>(initialConfig);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, role: "user" | "assistant") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    addMessage(userMessage, "user");
    setIsLoading(true);

    // 添加空的 assistant 消息，用于后续填充内容
    const assistantMessageId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        content: "",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);

    try {
      const apiMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
      apiMessages.push({ role: "user", content: userMessage });

      await sendMessageToDeepSeek(apiMessages, config, (chunk) => {
        updateLastAssistantMessage(chunk);
        setIsLoading(false);
      });
    } catch (error) {
      updateLastAssistantMessage("抱歉，我遇到了一些问题，请稍后再试。");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLastAssistantMessage = (newContent: string) => {
    setMessages((prevMessages) => {
      const updated = [...prevMessages];
      const lastIndex = updated.map((m) => m.role).lastIndexOf("assistant");

      if (lastIndex !== -1) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          content: updated[lastIndex].content + newContent,
        };
      }
      return updated;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSendMessage,
    handleKeyDown,
    messagesEndRef,
    config,
    setConfig,
  };
};