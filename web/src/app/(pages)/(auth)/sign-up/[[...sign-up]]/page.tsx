"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp, useSignIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

const page = () => {
  const router = useRouter();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { getToken } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!signUpLoaded || !signInLoaded || !signUp || !signIn) {
      setError("Auth not ready");
      return;
    }

    // validation...
    setLoading(true);
    try {
      console.log("Creating user", { email, firstName, lastName });
      const createRes = await signUp.create({ emailAddress: email, password, firstName, lastName });
      console.log("signUp.create =>", createRes);

      // If session created -> signed in
      if (createRes?.status === "complete" || createRes?.createdSessionId) {
        // get token from Clerk (must await getToken())
        const token = await getToken();
        console.log("User signed in, token:", token);
        await fetch(`${API_BASE}/api/profile/me`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ firstName, lastName, email }),
        });
        router.push("/");
        return;
      }

      // No session: likely email verification required
      if (typeof signUp.prepareEmailAddressVerification === "function") {
        await signUp.prepareEmailAddressVerification();
        // Redirect to your verification/OTP page — provide email or clerk user id in query
        router.push(`/verify?email=${encodeURIComponent(email)}`);
        return;
      }

      // Fallback: redirect to a generic info/verify page
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error("signup error", err);
      setError(err?.errors?.[0]?.message || err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((s) => !s);


  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden h-screen bg-cover bg-no-repeat lg:block lg:w-2/3"
          style={{ backgroundImage: "url('/assets/Images/signIn.jpg')" }}
        />
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-3 text-black text-2xl font-bold sm:text-3xl">
                Create your account
              </p>
            </div>
            <div className="mt-8">
              <form
                className="flex flex-col gap-6 mt-8"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block mb-2 text-sm text-black">
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-black">
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-black">
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-5 py-3 pr-12 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-blue-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-black">
                    Confirm Password
                  </label>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg"
                >
                  {loading ? "Creating..." : "Sign Up"}
                </button>
              </form>

              <p className="mt-6 text-sm text-center text-black">
                Already have an account?{" "}
                <Link
                  href="sign-in"
                  className="text-blue-500"
                >
                  Sign in
                </Link>
                .
              </p>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
