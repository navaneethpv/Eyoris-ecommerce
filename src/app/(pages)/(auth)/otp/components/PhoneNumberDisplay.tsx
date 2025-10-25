import React from "react";
import Link from "next/link";
const PhoneNumberDisplay = () => {
  return (
    <div>
      <p className="text-sm text-gray-600 flex items-center">
        <span className="font-medium text-gray-900 mr-1">IN +918838838181</span>
        <Link
          href="/phone"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Change
        </Link>
      </p>
    </div>
  );
};

export default PhoneNumberDisplay;
