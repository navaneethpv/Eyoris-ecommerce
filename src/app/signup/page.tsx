"use client";

import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-white">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h2>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="text-green-600 hover:text-green-500 font-medium">
                Sign in
              </a>
            </p>
          </div>

          <form className="space-y-6">
            <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2.5 border-b border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 transition duration-150"
                    placeholder="Your name"
                  />
            </div>

            <div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2.5 border-b border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 transition duration-150"
                    placeholder="Username"
                  />
            </div>

            <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2.5 border-b border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 transition duration-150"
                    placeholder="Email address"
                  />
            </div>

            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="mt-1 block w-full px-3 py-2.5 border-b border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 pr-10 transition duration-150"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .95-3.112 3.54-5.447 6.834-6.166M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c1.474 0 2.87.344 4.125.95M19.042 16.542L2.958 3.458" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree with{" "}
                  <a href="/privacy" className="text-black hover:text-gray-800 font-bold">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="text-black hover:text-gray-800 font-bold">
                    Terms of Use
                  </a>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
