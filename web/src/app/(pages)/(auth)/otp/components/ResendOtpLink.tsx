import React from "react";
import Link from "next/link";
const ResendOtpLink = () => {
  return (
    <div>
      <div className="text-center">
        <Link
          href="/resend-otp"
          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
        >
          Resend OTP
        </Link>
      </div>
    </div>
  );
};

export default ResendOtpLink;
