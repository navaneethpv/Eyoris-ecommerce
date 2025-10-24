// Imports
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Component definition
export default function SignupPage() {
  // Router hook
  const router = useRouter();

  // Render section
  return (
    // Main container
    <div className="space-y-8">
      {/* Main content card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          {/* Header section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Looks like you are new to Eyoris
            </h2>
            {/* Email display */}
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-medium text-gray-900 mr-1">
                example@gmail.com
              </span>
              <Link href="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
                Change
              </Link>
            </p>
          </div>

          {/* Instructions */}
          <p className="text-base text-gray-700">
            Let&apos;s create an account using your mobile number
          </p>

          {/* Proceed button */}
          <div>
            <button
              type="button"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out hover:cursor-pointer"
              onClick={()=>router.push("/PhonePage")}
            >
              Proceed to create an account
            </button>
          </div>

          {/* Sign-in link */}
          <div className="text-center pt-4 border-t border-gray-200 mt-6">
            <p className="text-sm text-gray-600">
              Already a customer?{" "}
              <Link href="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign In with another email or mobile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
