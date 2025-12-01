import React from "react";
import Link from "next/link";
const CheckBox = () => {
  return (
    <div>
      <div className="flex items-center">
        <input
          id="agree-terms"
          name="agree-terms"
          type="checkbox"
          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label
          htmlFor="agree-terms"
          className="ml-2 block text-sm text-gray-900"
        >
          I agree with{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-black hover:text-gray-800"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-of-use"
            className="font-medium text-black hover:text-gray-800"
          >
            Terms of Use
          </Link>
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
