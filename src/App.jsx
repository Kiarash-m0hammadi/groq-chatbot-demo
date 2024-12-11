import AppName from "./components/AppName";
import Button from "./components/Button";
import Chat from "./components/Chat";
import Headings from "./components/Headings";
import SendMessageForm from "./components/SendMessageForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useChatHandlers } from "./hooks/useChatHandlers";

const App = () => {
  // Initialize state with an empty string
  const [state, setState] = useLocalStorage("appState", {
    inputValue: "",
    chatMessages: [],
  });

  const { handleInputChange, handleSend, handleClearChat } = useChatHandlers(
    state,
    setState
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default action (newline)
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
        <AppName>
          <div className="text-3xl font-bold text-center mb-8">
            <span className="text-blue-600">GROQ </span>
            <span className="text-gray-800">ChatBot</span>
          </div>
        </AppName>

        {/* Only show Headings if there are no chat messages */}
        {state.chatMessages.length === 0 && (
          <div className="mb-8">
            <Headings>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 text-center">
                  Hi, Welcome.
                </h1>
              </div>
              <div>
                <h3 className="text-lg text-gray-600 text-center mt-2">
                  How can I help you today?
                </h3>
              </div>
            </Headings>
          </div>
        )}

        {/* Only show Chat if there are messages */}
        {state.chatMessages.length > 0 && (
          <div className="chat-container bg-white rounded-lg shadow-md p-4 mb-4">
            <Chat>
              {state.chatMessages.map((message, index) => (
                <div key={index} className="mb-4">
                  <div className="chat-prompt bg-gray-100 p-3 rounded-t-lg text-gray-800">
                    {message.prompt}
                  </div>
                  <div className="chat-response bg-blue-50 p-3 rounded-b-lg text-gray-700">
                    {message.response}
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Button
                  textContent="Clear Chat"
                  handleClick={handleClearChat}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                />
              </div>
            </Chat>
          </div>
        )}

        <SendMessageForm
          inputValue={state.inputValue}
          onChange={handleInputChange}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default App;
