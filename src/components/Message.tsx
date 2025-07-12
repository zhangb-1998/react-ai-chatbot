import React from "react";
import { type Message } from "../types/types";

interface MessageProps {
  message: Message;
}

export const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex mb-4 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
          isAssistant ? "bg-gray-100 text-gray-800" : "bg-indigo-500 text-white"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div
          className={`text-xs mt-1 ${
            isAssistant ? "text-gray-500" : "text-indigo-100"
          }`}
        >
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
