import React from "react";

function Message({ sender, text }) {
  return (
    <div>
      <strong>{sender}:</strong> {text}
    </div>
  );
}

export default Message;
