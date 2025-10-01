"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const LoginGoogleButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-indigo-800 py-2 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-indigo-900 transition-colors"
    >
      <div className="bg-white rounded-full p-1">
        <FcGoogle className="size-6" />
      </div>
      <span className="font-semibold text-white capitalize">
        Sign in with Google
      </span>
    </button>
  );
};

export default LoginGoogleButton;
