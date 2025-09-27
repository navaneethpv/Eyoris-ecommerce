"use client";

import Link from "next/link";
import PhonePage from "../phone/page";
// No useState needed for this design

export default function SignupPage() {
  // No showPassword state needed for this design

  return (
    <div className="space-y-8">
      {/* Main content card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Looks like you are new to Eyoris
            </h2>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-medium text-gray-900 mr-1">
                example@gmail.com
              </span>
              <Link href="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
                Change
              </Link>
            </p>
          </div>

          <p className="text-base text-gray-700">
            Let's create an account using your mobile number
          </p>

          <div>
            <Link href={"/phone"}>
            <button
              type="button"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out hover:cursor-pointer"
            >
              Proceed to create an account
            </button>
            </Link>
          </div>

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
