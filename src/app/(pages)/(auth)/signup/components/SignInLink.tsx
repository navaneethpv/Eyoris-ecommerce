import React from "react";
import Link from "next/link";
const SignInLink = () => {
  return (
    <div>
      {" "}
      <div className="text-center pt-4 border-t border-gray-200 mt-6">
        <p className="text-sm text-gray-600">
          Already a customer?{" "}
          <Link
            href="/signin"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign In with another email or mobile
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInLink;
