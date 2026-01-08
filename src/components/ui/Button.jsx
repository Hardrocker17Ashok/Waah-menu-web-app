const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      {children}
    </button>
  );
};

export default Button;
