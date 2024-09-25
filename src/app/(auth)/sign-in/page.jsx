"use client";
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
    } else {
      router.push("/"); // Redirect to home after successful sign-in
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg shadow-lg bg-white overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src='/login.jpg' // Replace with your image path
            alt="Login illustration"
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Sign In</h1>
          <form onSubmit={handleSubmit} className="mt-6">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
          
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>

          {/* Social Sign-In Buttons */}
          <div className="mt-6 flex flex-col space-y-3">
            <button
              onClick={() => signIn("google")}
              className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Sign in with Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
