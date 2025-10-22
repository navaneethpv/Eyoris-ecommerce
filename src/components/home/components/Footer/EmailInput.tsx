import React from "react";

const EmailInput = () => {
  return (
    <>
      <form className="flex mt-10">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow border border-gray-400 rounded-l-md px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-transparent border border-gray-400 rounded-r-md px-3 py-2 hover:bg-gray-200"
          aria-label="Subscribe"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
    </>
  );
};

export default EmailInput;
