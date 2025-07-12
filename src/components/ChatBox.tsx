import React from "react";
import type { ChatMessage } from "../types/types";

interface Props {
  messages: ChatMessage[];
}

const userAvatar = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload/assets/tororo.png";
const botAvatar = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload/assets/hijiki.png";

const ChatBox: React.FC<Props> = ({ messages }) => {
  return (
    <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-150px)] bg-[#ece5dd]">
      {messages.map((msg, idx) => {
        const isUser = msg.role === "user";
        return (
          <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
              <img src={botAvatar} alt="bot" className="w-8 h-8 rounded mr-2 self-end shadow" />
            )}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line ${
                isUser
                  ? "bg-[#95ec69] text-black rounded-br-md ml-2"
                  : "bg-white text-black rounded-bl-md mr-2"
              }`}
            >
              {msg.content}
            </div>
            {isUser && (
              <img src={userAvatar} alt="user" className="w-8 h-8 rounded ml-2 self-end shadow" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
