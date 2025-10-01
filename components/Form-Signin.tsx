"use client";

import { Loader, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import LoginGoogleButton from "@/components/Login-GoogleButton";

const FormSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", { email, password, callbackUrl: "/" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full hover:shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
              Back!
            </span>
          </h2>
          <span className="text-sm text-gray-600">
            Sign in to your account to continue.
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* email */}
          <div className="">
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* password */}
          <div className="">
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            <p className="text-xs text-gray-600 text-center">
              Or continue with
            </p>
            <LoginGoogleButton />
          </div>

          <div className="text-sm text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignin;
