import AppName from "./components/AppName";
import Button from "./components/Button";
import Chat from "./components/Chat";
import Groq from "groq-sdk";
import Headings from "./components/Headings";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const App = () => {
  // Initialize state with an empty string
  const [state, setState] = useState(() => {
    const localValue = localStorage.getItem("appState");
    if (localValue === null) {
      return {
        inputValue: "",
        chatMessages: [],
      };
    }
    return JSON.parse(localValue);
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  const handleInputChange = (event) => {
    // Update state with the new input value
    setState((prevState) => ({
      ...prevState,
      inputValue: event.target.value,
    }));
  };

  // Send the prompt to the API
  const handleSend = async () => {
    if (state.inputValue.trim() === "") return;

    const chatPrompt = `You: ${state.inputValue}`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: state.inputValue,
          },
        ],
        model: "llama3-8b-8192",
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || "No response";

      const newChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      // Append the new chat message to the array
      setState((prevState) => ({
        ...prevState,
        chatMessages: [...prevState.chatMessages, newChatMessage],
        inputValue: "",
      }));
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      const errorMessage = "Error fetching chat completion";
      const newChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };
      // Append the error message to the array
      setState((prevState) => ({
        ...prevState,
        chatMessages: [...prevState.chatMessages, newChatMessage],
        inputValue: "",
      }));
    }
  };

  const handleClearChat = () => {
    // Clear the chat messages state
    setState((prevState) => ({
      ...prevState,
      chatMessages: [],
      inputValue: "",
    }));

    // Remove chat history from localStorage
    localStorage.removeItem("appState");
  };

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

        <div className="searchBar-container">
          <SearchBar>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter your text"
              value={state.inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows="3"
            />
            <div className="mt-2">
              <Button
                textContent="Send"
                handleClick={handleSend}
                className={`${
                  state.inputValue.trim() === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white px-6 py-2 rounded-lg w-full`}
                disabled={state.inputValue.trim() === ""}
              />
            </div>
          </SearchBar>
        </div>
      </div>
    </div>
  );
};

export default App;
