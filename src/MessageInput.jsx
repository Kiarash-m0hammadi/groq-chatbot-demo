import React from "react";

function MessageInput({ input, setInput, handleSend }) {
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
