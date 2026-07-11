const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  rules,
  error,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-white outline-none transition-all ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-700 focus:border-blue-500"
        }`}
      />
  
      {error && (
        <p className="text-sm text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;