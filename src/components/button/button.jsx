function Button({ text, className, onClick, form }) {
  return (
    <div>
      <button
        onClick={onClick}
        form={form}
        className={`flex items-center justify-center ${className}`}
      >
        {text}
      </button>
    </div>
  );
}
export default Button;
