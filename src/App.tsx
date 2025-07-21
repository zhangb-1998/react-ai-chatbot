import { ChatContainer } from "./components/ChatContainer";
import { useChat } from "./hooks/useChat";
import { Sidebar } from "./components/Sidebar";

function App() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    handleSendMessage,
    handleKeyDown,
    messagesEndRef,
  } = useChat();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatContainer
          messages={messages}
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
        />
      </div>
    </div>
  );
}

export default App;
