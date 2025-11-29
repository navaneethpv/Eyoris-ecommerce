// Imports
"use client";

import { useRouter } from "next/navigation";
import InputField from "./components/InputField";
import CheckBox from "./components/CheckBox";
import { useState } from "react";

// Component definition
export default function SigninPage() {
  // Router hook
  const router = useRouter();
  
  const [email, setEmail] = useState<string>("");
  // Render section
  return (
    // Main container
    <div className="space-y-8">
      {/* Form card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          {/* Header section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sign in or create a account
            </h2>
          </div>

          {/* Sign-in form */}
          <form className="space-y-6">
            {/* Email/phone input field */}
            <InputField email={email} setEmail={setEmail}/>

            {/* Terms agreement checkbox */}
            <CheckBox />

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                onClick={() => router.push("/phone")}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
