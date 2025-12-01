"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import UserDropMenu from "./UserDropMenu";

interface UsermenuProps {
  handleLoginClick?: () => void;
  isDropdownOpen?: boolean;
}

const Usermenu: React.FC<UsermenuProps> = ({ handleLoginClick, isDropdownOpen }) => {
  const { user } = useUser();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // local open state (used when parent doesn't control open state)
  const [localOpen, setLocalOpen] = React.useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

  const open = typeof isDropdownOpen === "boolean" ? isDropdownOpen : localOpen;

  React.useEffect(() => {
    function handleOutsideEvent(e: Event) {
      const el = containerRef.current;
      const menuEl = menuRef.current;
      if (!el && !menuEl) return;

      const path: EventTarget[] =
        (e as any).composedPath?.() ||
        ((e as any).path as EventTarget[]) ||
        [];

      if (path && path.length) {
        if (el && path.includes(el)) return;
        if (menuEl && path.includes(menuEl)) return;
      } else {
        if (el && el.contains(e.target as Node)) return;
        if (menuEl && menuEl.contains(e.target as Node)) return;
      }

      // hide dropdown and prompt when clicking outside
      if (typeof isDropdownOpen !== "boolean") {
        setLocalOpen(false);
        setShowLoginPrompt(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && typeof isDropdownOpen !== "boolean") {
        setLocalOpen(false);
        setShowLoginPrompt(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideEvent, true);
    document.addEventListener("touchstart", handleOutsideEvent, true);
    document.addEventListener("keydown", handleKey, true);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideEvent, true);
      document.removeEventListener("touchstart", handleOutsideEvent, true);
      document.removeEventListener("keydown", handleKey, true);
    };
  }, [isDropdownOpen]);

  function onButtonClick() {
    handleLoginClick?.();
    if (user) {
      if (typeof isDropdownOpen !== "boolean") {
        setLocalOpen((v) => !v);
        // ensure login prompt hidden when opening menu
        setShowLoginPrompt(false);
      }
    } else {
      // show prompt telling user to login
      setShowLoginPrompt(true);
      // auto-hide after 3s
      window.setTimeout(() => setShowLoginPrompt(false), 3000);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={onButtonClick}
        className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {/* user icon */}
        <svg className="w-5.5 h-5.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>

        <span className="mr-1">{user ? "Menu" : "Login"}</span>

        <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* login prompt shown when user not logged in and clicks the button */}
      {showLoginPrompt && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-50">
          <p className="text-sm text-gray-800 mb-2">Please login to the website</p>
          <div className="flex gap-2">
            <Link href="/sign-in" className="text-sm px-3 py-1 bg-blue-600 text-white rounded">Sign In</Link>
            <Link href="/sign-up" className="text-sm px-3 py-1 border rounded">Sign Up</Link>
          </div>
        </div>
      )}

      {/* only render user menu when logged in */}
      {user && open && <UserDropMenu menuRef={menuRef} />}
    </div>
  );
};

export default Usermenu;
