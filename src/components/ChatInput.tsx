import React, { useState } from "react";

interface Props {
  onSend: (input: string) => void;
}

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-3 bg-[#f7f7f7] border-t border-[#ece5dd]">
      <input
        className="flex-1 p-2 rounded-3xl border-none outline-none bg-white shadow text-base"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="请输入您的问题..."
      />
      <button
        type="submit"
        className="ml-3 px-5 py-2 rounded-3xl bg-[#95ec69] text-black font-semibold shadow hover:bg-[#b2f08b] transition"
      >
        发送
      </button>
    </form>
  );
};

export default ChatInput;
