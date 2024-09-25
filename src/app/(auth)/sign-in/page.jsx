
"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      console.error(result.error);
    } else {
      router.push("/"); // Redirect to home after successful sign-in
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => signIn("google")}
            className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;