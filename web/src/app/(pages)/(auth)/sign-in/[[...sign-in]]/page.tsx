'use client';
import React from "react";
// Removed Image import since we're using background-image
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const signIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden h-screen bg-cover bg-no-repeat lg:block lg:w-2/3"
            style={{
              backgroundImage: "url('/assets/Images/signIn.jpg')",  // Set as background image for proper coverage
            }}
          >
            {/* Removed Image component; background image now covers the div */}
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <p className="mt-3 text-black text-2xl font-bold sm:text-3xl">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-black"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-700 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-black">
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-black focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}  // Updated to toggle type
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="block w-full px-4 py-2 mt-2 pr-10 text-gray-700 placeholder-gray-700 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-black">
                  Don&#x27;t have an account yet?{" "}
                  <a
                    href="#"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signIn;
