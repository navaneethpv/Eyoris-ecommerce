import React from "react";
import LogoSection from "./components/Footer/LogoSection";
import EmailInput from "./components/Footer/EmailInput";
import Support from "./components/Footer/SupportSection";
import AccountSection from "./components/Footer/AccountSection";
import QuickLinkSection from "./components/Footer/QuickLinkSection";
import DownloadAppSection from "./components/Footer/DownloadAppSection";

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-800 py-10 px-6">
      <div className="flex flex-wrap justify-between max-w-7xl mx-auto gap-10">
        {/* Logo and description with email input */}
        <div className="space-y-0">
          <LogoSection />
          <EmailInput />
        </div>

        {/* Support */}
        <Support />

        {/* Account */}
        <AccountSection />

        {/* Quick Link */}
        <QuickLinkSection />

        {/* Download App */}
        <DownloadAppSection />
      </div>

      <hr className="my-6 border-gray-400" />
      <p className="text-center text-sm">
        &copy; Copyright Rimel 2022. All right reserved
      </p>
    </footer>
  );
}
