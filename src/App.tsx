import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';
import { useChat } from './hooks/useChat';

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
    <div className="box-border size-32 border-4 p-4 flex flex-col h-screen">
      <Header />
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
  );
}

export default App;