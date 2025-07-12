import React from 'react';
import { MessageComponent } from './Message';
import { InputArea } from './InputArea';
import { type Message } from '../types/types';

interface ChatContainerProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  input,
  setInput,
  handleSendMessage,
  handleKeyDown,
  isLoading,
  messagesEndRef,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          {messages.length === 0 ? (
            <div className="text-center mt-10 text-gray-500">
              <h2 className="text-xl font-semibold">欢迎使用AI智能客服</h2>
              <p className="mt-2">请问有什么可以帮您？</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <InputArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onSubmit={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};