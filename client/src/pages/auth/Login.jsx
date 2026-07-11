import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

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

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">

      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-white">
            AI Interview Coach
          </h1>

          <p className="mt-3 text-zinc-400">
            Welcome back! Sign in to continue.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
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
            register={register}
            rules={{
              required: "Password is required",
            }}
            error={errors.password}
          />

          <Button
            type="submit"
            loading={loading}
          >
            Sign In
          </Button>

        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-medium text-blue-500 hover:text-blue-400"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;