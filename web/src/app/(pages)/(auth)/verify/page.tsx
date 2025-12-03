'use client';
import React, { useRef } from "react";

const page = () => {
  const inputsRef = useRef([]);

  const handleInput = (e, idx) => {
    const val = e.target.value;
    // keep only the first character
    if (val.length > 1) {
      e.target.value = val.slice(0, 1);
    }
    if (val.length >= 1) {
      const next = inputsRef.current[idx + 1];
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      const prev = inputsRef.current[idx - 1];
      if (prev) prev.focus();
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden h-screen bg-cover bg-no-repeat lg:block lg:w-2/3"
            style={{
              backgroundImage: "url('/assets/Images/signIn.jpg')", // Set as background image for proper coverage
            }}
          >
            {/* Removed Image component; background image now covers the div */}
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <p className="mt-3 text-black text-2xl font-bold sm:text-3xl">
                  Verify Your Account
                </p>
              </div>

              <div className="mt-8">
                <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                  <header className="mb-8">
                    <h1 className="text-2xl font-bold mb-1 text-gray-800">
                      Email Verification
                    </h1>
                    <p className="text-[15px] text-gray-800">
                      Enter the 6-digit verification code that was sent to your
                      email.
                    </p>
                  </header>
                  <form id="otp-form" onSubmit={(e)=>e.preventDefault()}>
                    <div className="flex items-center justify-center gap-3">
                      <input
                        ref={(el) => (inputsRef.current[0] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                        onChange={(e) => handleInput(e, 0)}
                        onKeyDown={(e) => handleKeyDown(e, 0)}
                      />
                      <input
                        ref={(el) => (inputsRef.current[1] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                        onChange={(e) => handleInput(e, 1)}
                        onKeyDown={(e) => handleKeyDown(e, 1)}
                      />
                      <input
                        ref={(el) => (inputsRef.current[2] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                        onChange={(e) => handleInput(e, 2)}
                        onKeyDown={(e) => handleKeyDown(e, 2)}
                      />
                      <input
                        ref={(el) => (inputsRef.current[3] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                        onChange={(e) => handleInput(e, 3)}
                        onKeyDown={(e) => handleKeyDown(e, 3)}
                      />
                      <input
                        ref={(el) => (inputsRef.current[4] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                        onChange={(e) => handleInput(e, 4)}
                        onKeyDown={(e) => handleKeyDown(e, 4)}
                      />
                      <input
                        ref={(el) => (inputsRef.current[5] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                        onChange={(e) => handleInput(e, 5)}
                        onKeyDown={(e) => handleKeyDown(e, 5)}
                      />
                    </div>
                    <div className="max-w-[260px] mx-auto mt-10">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                      >
                        Verify Account
                      </button>
                    </div>
                  </form>
                  <div className="text-sm text-slate-500 mt-4">
                    Didn't receive code?{" "}
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
