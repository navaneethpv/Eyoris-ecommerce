// Imports
"use client";

import HeaderSection from "./components/HeaderSection";
import ButtonSection from "./components/ButtonSection";
import SignInLink from "./components/SignInLink";

// Component definition
export default function SignupPage() {
  // Router hook

  // Render section
  return (
    // Main container
    <div className="space-y-8">
      {/* Main content card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          {/* Header section */}
          <HeaderSection />

          {/* Instructions */}
          <p className="text-base text-gray-700">
            Let&apos;s create an account using your mobile number
          </p>

          {/* Proceed button */}
          <ButtonSection />

          {/* Sign-in link */}
          <SignInLink />
        </div>
      </div>
    </div>
  );
}
