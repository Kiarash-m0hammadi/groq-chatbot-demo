const Button = ({ textContent, handleClick, disabled }) => {
  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
    >
      {textContent}
    </button>
  );
};

export default Button;
