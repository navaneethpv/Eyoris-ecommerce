'use client';
import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignUp, useAuth } from "@clerk/nextjs";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailQuery = searchParams?.get("email") || "";
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const { getToken } = useAuth();

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // focus first input on mount
    inputsRef.current[0]?.focus();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = (e.target.value || "").replace(/\D/g, "").slice(0, 1);
    const nextDigits = [...digits];
    nextDigits[idx] = val;
    setDigits(nextDigits);

    if (val && inputsRef.current[idx + 1]) {
      inputsRef.current[idx + 1].focus();
    }

    // auto-submit when all filled
    if (nextDigits.every((d) => d.length === 1)) {
      void verifyCode(nextDigits.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    const target = e.currentTarget as HTMLInputElement;
    if (e.key === "Backspace" && !target.value && idx > 0) {
      const prev = inputsRef.current[idx - 1];
      prev?.focus();
    }
    // allow arrow navigation
    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  async function verifyCode(code: string) {
    setError("");
    if (!signUpLoaded || !signUp) {
      setError("Auth not loaded. Try again.");
      return;
    }
    setLoading(true);
    try {
      // Ensure signUp has been prepared previously (prepareEmailAddressVerification)
      if (typeof signUp.attemptEmailAddressVerification !== "function") {
        throw new Error("signUp.attemptEmailAddressVerification not available. Check Clerk SDK version.");
      }

      const result = await signUp.attemptEmailAddressVerification({ code });
      console.log("attemptEmailAddressVerification result:", result);

      // Many Clerk SDKs return status === "complete" on success and create a session
      if (result?.status === "complete" || result?.createdSessionId) {
        // we have a session, get token and persist profile to backend if needed
        try {
          const token = await getToken();
          // if you passed email in query when redirecting here, you can send extra profile data
          await fetch(`${API_BASE}/api/profile/me`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email: emailQuery }),
          });
        } catch (backendErr) {
          console.warn("backend persist failed", backendErr);
        }

        router.push("/");
        return;
      }

      // If verification succeeded but no session created, prompt user to sign in
      if (result?.status === "verified" || result?.status === "verification_success") {
        // redirect to sign-in page
        router.push("/auth/sign-in");
        return;
      }

      setError("Verification failed. Check the code and try again.");
    } catch (err: any) {
      console.error("verify error", err);
      setError(err?.message || "Verification error");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Enter the 6-digit code");
      return;
    }
    void verifyCode(code);
  };

  async function showTokenAndCallApi() {
    try {
      const token = await getToken(); // <-- Bearer token
      console.log('Clerk token:', token);

      // Example call to your backend
      const res = await fetch('http://localhost:4000/api/profile/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName: 'Alice', lastName: 'Doe' }),
      });
      console.log('backend status', res.status, await res.json());
    } catch (err) {
      console.error('getToken / API error', err);
    }
  }

  return (
    <div>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden h-screen bg-cover bg-no-repeat lg:block lg:w-2/3"
            style={{ backgroundImage: "url('/assets/Images/signIn.jpg')" }}
          />
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <p className="mt-3 text-black text-2xl font-bold sm:text-3xl">Verify Your Account</p>
              </div>
              <div className="mt-8">
                <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                  <header className="mb-8">
                    <h1 className="text-2xl font-bold mb-1 text-gray-800">Email Verification</h1>
                    <p className="text-[15px] text-gray-800">Enter the 6-digit verification code sent to your email{emailQuery ? ` (${emailQuery})` : ""}.</p>
                  </header>
                  <form id="otp-form" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <input
                          key={i}
                          ref={(el) => (inputsRef.current[i] = el as HTMLInputElement)}
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          maxLength={1}
                          value={digits[i]}
                          onChange={(e) => handleInput(e as React.ChangeEvent<HTMLInputElement>, i)}
                          onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, i)}
                          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                      ))}
                    </div>

                    <div className="max-w-[260px] mx-auto mt-10">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex justify-center rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                      >
                        {loading ? "Verifying..." : "Verify Account"}
                      </button>
                    </div>
                  </form>

                  <div className="text-sm text-slate-500 mt-4">
                    Didn't receive code?{" "}
                    <button
                      onClick={async () => {
                        setError("");
                        if (!signUpLoaded || !signUp || typeof signUp.prepareEmailAddressVerification !== "function") {
                          setError("Cannot resend: auth not available or SDK version mismatch.");
                          return;
                        }
                        try {
                          await signUp.prepareEmailAddressVerification();
                          setError("Verification email resent. Check your inbox.");
                        } catch (err: any) {
                          console.error("resend error", err);
                          setError("Resend failed.");
                        }
                      }}
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                    >
                      Resend
                    </button>
                  </div>

                  {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <button onClick={showTokenAndCallApi}>Get token & call API</button>
    </div>
  );
};

export default page;
