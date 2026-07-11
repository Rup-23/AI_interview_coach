const Button = ({
  children,
  loading,
  disabled,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;