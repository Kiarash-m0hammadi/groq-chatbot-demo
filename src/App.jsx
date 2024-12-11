// App.jsx
import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "User", text: input }]);
      setInput("");

      // Simulate a demo answer
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Bot", text: "This is a demo answer." },
        ]);
      }, 500);
    }
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
}

export default App;
