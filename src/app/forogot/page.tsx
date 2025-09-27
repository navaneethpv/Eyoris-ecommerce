"use client";

import Link from "next/link";

export default function ForgotPage() {
  return (
    <div className="space-y-8">
      {/* Main content card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication required
            </h2>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-medium text-gray-900 mr-1">
                IN +918838838181
              </span>
              <Link
                href="/change-phone"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Change
              </Link>
            </p>
            <p className="text-sm text-gray-700 mt-4">
              We've sent a One Time Password (OTP) to the mobile number above.
              Please enter it to complete verification
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link
              href="/resend-otp"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Resend OTP
            </Link>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

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
            >
              Sign In with password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
