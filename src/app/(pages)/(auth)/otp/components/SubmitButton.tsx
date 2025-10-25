import React from "react";
const SubmitButton = () => {
  const router = require("next/navigation").useRouter();
  return (
    <div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          onClick={() => router.push("/")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SubmitButton;
