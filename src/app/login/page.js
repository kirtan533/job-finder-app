"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful 🎉");
      reset();
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Login
        </h2>

        {/* Email */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        {errors.email && (
          <p className="text-red-500 dark:text-red-400 text-sm mb-2">
            {errors.email.message}
          </p>
        )}

        {/* Password */}
        <input
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        {errors.password && (
          <p className="text-red-500 dark:text-red-400 text-sm mb-2">
            {errors.password.message}
          </p>
        )}

        {/* Button */}
        <button
          disabled={isSubmitting}
          className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer disabled:opacity-50 transition"
          type="submit"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Switch to signup */}
        <p
          className="mt-3 text-sm text-center cursor-pointer text-blue-500 dark:text-blue-400"
          onClick={() => router.push("/signup")}
        >
          New user? Signup
        </p>
      </form>
    </div>
  );
}
