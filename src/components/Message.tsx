import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import type { Message } from "../types/types";
interface MessageProps {
  message: Message;
}

export const MessageComponent = ({ message }: MessageProps) => {
  console.log("MessageComponent", message);

  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex mb-4 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 relative ${
          isAssistant
            ? "bg-white border border-gray-200"
            : "bg-emerald-500 text-white"
        }`}
      >
        {isAssistant ? (
          <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45" />
        ) : (
          <div className="absolute -right-1.5 top-3 w-3 h-3 bg-emerald-500 transform rotate-45" />
        )}
        <div className="whitespace-pre-wrap my-2 p-3 rounded-xl">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {message.content}
          </ReactMarkdown>
        </div>
        <div
          className={`text-xs mt-1 text-right ${
            isAssistant ? "text-gray-400" : "text-emerald-100"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
