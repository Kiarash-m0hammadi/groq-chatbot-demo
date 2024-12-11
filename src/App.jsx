import React, { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
