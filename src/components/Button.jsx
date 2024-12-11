const Button = ({ textContent, handleClick, disabled }) => {
  return (
    <button type="submit" onClick={handleClick} disabled={disabled}>
      {textContent}
    </button>
  );
};

export default Button;
