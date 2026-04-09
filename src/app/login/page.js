"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    router.push("/jobs");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg"
        />

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Login
        </button>
      </form>
    </div>
  );
}
