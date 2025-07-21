import { MessageComponent } from './Message';
import { InputArea } from './InputArea';

interface ChatContainerProps {
  messages: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }>;
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatContainer = ({
  messages,
  input,
  setInput,
  handleSendMessage,
  handleKeyDown,
  isLoading,
}: ChatContainerProps) => {
  // console.log('ChatContainer',messages);
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-emerald-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">AI智能客服</h1>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></span>
          <span>在线</span>
        </div>
      </div>
    </header>
      <div className="flex-1 overflow-y-auto min-h-0 p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-full p-2 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0 h-30">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <InputArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
          />
          <button className="p-2 text-gray-500 hover:text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};