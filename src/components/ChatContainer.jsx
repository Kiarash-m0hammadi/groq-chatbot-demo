import Chat from "./Chat";
import Button from "./Button";

const ChatContainer = ({ messages, onSendMessage }) => {
  return (
    <div className="chat-container">
      <Chat messages={messages} />
      <Button onClick={onSendMessage} />
    </div>
  );
};

export default ChatContainer;
