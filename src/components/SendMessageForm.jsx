import Button from "./Button";
import SearchBar from "./SearchBar";

const SendMessageForm = ({ inputValue, onChange, onSend, onKeyDown }) => {
  return (
    <div className="searchBar-container">
      <SearchBar>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter your text"
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          rows="3"
        />
        <div className="mt-2">
          <Button
            textContent="Send"
            handleClick={onSend}
            className={`${
              inputValue.trim() === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-6 py-2 rounded-lg w-full`}
            disabled={inputValue.trim() === ""}
          />
        </div>
      </SearchBar>
    </div>
  );
};

export default SendMessageForm;
