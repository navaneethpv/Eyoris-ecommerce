import React from "react";

const OtpInput = () => {
  return (
    <div>
      {" "}
      <div>
        <div className="mt-1">
          <input
            id="otp"
            name="otp"
            type="text"
            required
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter OTP"
          />
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
