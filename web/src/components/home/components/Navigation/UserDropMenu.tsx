"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const UserDropMenu = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  const handlePointerEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  };

  const handlePointerLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      console.error("Sign out failed", err);
      setLoading(false);
    }
  };

  // Render the Menu button even if Clerk isn't fully loaded
  if (!isLoaded) {
    return (
      <div className="relative inline-block text-left" tabIndex={0}>
        <button className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100 focus:outline-none">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4v16M4 12h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Menu</span>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="relative inline-block text-left"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handlePointerEnter}
      onBlur={handlePointerLeave}
      tabIndex={0}
    >
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        {isSignedIn && user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.fullName || "user avatar"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <svg
            className="w-5 h-5 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="text-sm font-medium text-gray-700">
          {isSignedIn ? user?.firstName || user?.fullName || "Account" : "Menu"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {isSignedIn ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>

                <Link
                  href="/account/orders"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </Link>

                <Link
                  href="/image-history"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Image history
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Wishlist
                </Link>

                <div className="border-t border-gray-200" />

                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="flex items-center">Sign out</span>
                  {loading && (
                    <svg
                      className="w-4 h-4 text-gray-400 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropMenu;
