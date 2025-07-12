import { useState, useRef, useEffect } from 'react';
import { sendMessageToDeepSeek } from '../api';
import type { ChatConfig, Message } from '../types/types';

export const useChat = (initialConfig: ChatConfig = { model: 'deepseek-chat' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ChatConfig>(initialConfig);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, role: 'user' | 'assistant') => {
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
    setInput('');
    addMessage(userMessage, 'user');
    setIsLoading(true);

    try {
      const apiMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
      apiMessages.push({ role: 'user', content: userMessage });

      const response = await sendMessageToDeepSeek(apiMessages, config);
      addMessage(response, 'assistant');
    } catch (error) {
      addMessage('抱歉，我遇到了一些问题，请稍后再试。', 'assistant');
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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