import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await login(data);
      toast.success(response.message);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-6 bg-grid">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="animate-scale-in relative w-full max-w-md">

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 shadow-2xl shadow-black/30">

          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-bold text-white shadow-lg shadow-blue-500/25">
              AI
            </div>
            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-zinc-400">
              Sign in to continue your preparation
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              icon={Mail}
              register={register}
              rules={{
                required: "Email is required",
              }}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              icon={Lock}
              register={register}
              rules={{
                required: "Password is required",
              }}
              error={errors.password}
            />

            <div className="pt-2">
              <Button
                type="submit"
                loading={loading}
                fullWidth
              >
                Sign In
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;