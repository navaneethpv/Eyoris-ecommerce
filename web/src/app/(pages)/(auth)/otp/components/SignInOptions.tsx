import React from "react";
import { useRouter } from "next/navigation";
const SignInOptions = () => {
  const router = useRouter();
  return (
    <div>
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
        >
          Sent OTP to WhatsApp
        </button>
        <button
          type="button"
          className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          onClick={() => router.push("phone")}
        >
          Sign In with password
        </button>
      </div>
    </div>
  );
};

export default SignInOptions;
