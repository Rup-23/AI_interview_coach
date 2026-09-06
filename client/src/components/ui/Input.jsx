import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  rules,
  error,
  icon: Icon,
}) => {
  const errorId = `${name}-error`;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
        )}

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          {...register(name, rules)}
          className={`
            w-full rounded-xl border bg-zinc-950/80 px-4 py-3 text-white
            outline-none transition-all duration-200
            placeholder:text-zinc-600
            focus:ring-2 focus:ring-blue-500/20
            ${Icon ? "pl-11" : ""}
            ${isPassword ? "pr-12" : ""}
            ${
              error
                ? "border-red-500/60 focus:border-red-500"
                : "border-zinc-700/60 focus:border-blue-500 hover:border-zinc-600"
            }
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm text-red-400" role="alert">
          <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;