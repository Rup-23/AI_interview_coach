import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Register = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await registerUser(data);

      toast.success(response.message);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
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
            Create Account
          </h1>

          <p className="mt-3 text-zinc-400">
            Start your AI interview journey.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <Input
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            register={register}
            rules={{
              required: "Full name is required",
            }}
            error={errors.fullName}
          />

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
            placeholder="Create a password"
            register={register}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
              },
            }}
            error={errors.password}
          />

          <Button
            type="submit"
            loading={loading}
          >
            Create Account
          </Button>

        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-medium text-blue-500 hover:text-blue-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;