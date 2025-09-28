"use client";

import Link from "next/link";

export default function PhonePage() {
  return (
    <div className="space-y-8">
      {/* Main content card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h2>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-medium text-gray-900 mr-1">
                +918788838828
              </span>
              <Link
                href="/phone"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Change
              </Link>
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <Link href={"/"}>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Sign In
              </button>
              </Link>
            </div>
          </form>

          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          <div>
            <Link href="/otp">
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out hover:cursor-pointer"
              >
                Get an OTP on your phone
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
