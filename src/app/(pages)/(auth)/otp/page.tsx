// Imports
"use client";

import HeaderSection from "./components/HeaderSection";
import PhoneNumberDisplay from "./components/PhoneNumberDisplay";
import Instructions from "./components/Instructions";
import OtpInput from "./components/OtpInput";
import SubmitButton from "./components/SubmitButton";
import ResendOtpLink from "./components/ResendOtpLink";
import SignInOptions from "./components/SignInOptions";

// Component definition
export default function OtpPage() {

  // Render section
  return (
    // Main container
    <div className="space-y-8">
      {/* Main content card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <HeaderSection />
          <PhoneNumberDisplay />
          <Instructions />
        </div>

        {/* OTP form */}
        <form className="space-y-6">
          <OtpInput />
          <SubmitButton />
        </form>

        {/* Resend OTP link */}
        <ResendOtpLink />

        {/* Divider */}
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
          <div className="absolute inset-y-0 left-0 right-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        {/* Alternative sign-in options */}
        <SignInOptions />
      </div>
    </div>
  );
}
