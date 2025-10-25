import React from "react";
import { useRouter } from "next/navigation";
const ButtonSection = () => {
  const router = useRouter();
  return (
    <div>
      <div>
        <button
          type="button"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out hover:cursor-pointer"
          onClick={() => router.push("/PhonePage")}
        >
          Proceed to create an account
        </button>
      </div>
    </div>
  );
};

export default ButtonSection;
