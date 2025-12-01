"use client";

import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-white flex">
        {/* Left side - Decorative image */}
        <div className="hidden lg:block lg:w-1/2 relative bg-[#F3F5F7]">
          <Link href="/" className="absolute top-8 left-100 z-10">
            <Image
              src="/assets/Images/logo.png"
              alt="Eyoris Logo"
              width={200}
              height={50}
              className="object-contain"
            />
          </Link>
          <Image
            src="/assets/Images/siginIn.png"
            alt="Cozy chair with blanket"
            fill
            className="object-cover"
          />
        </div>

        {/* Right side - Content area */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </ClerkProvider>
  );
}
