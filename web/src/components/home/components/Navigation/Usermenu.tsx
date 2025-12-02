"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import UserDropMenu from "./UserDropMenu";

const Usermenu: React.FC<{
  handleLoginClick?: () => void;
  isDropdownOpen?: boolean;
}> = ({ handleLoginClick, isDropdownOpen }) => {
  const { user, isSignedIn } = useUser();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const [localOpen, setLocalOpen] = React.useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);
  const [stayOpen, setStayOpen] = React.useState(false);

  const open = typeof isDropdownOpen === "boolean" ? isDropdownOpen : localOpen;

  React.useEffect(() => {
    function handleDocumentPointer(e: Event) {
      const container = containerRef.current;
      if (!container) return;

      const path: EventTarget[] = (e as any).composedPath?.() || (e as any).path || [];

      const clickedInsideContainer = path?.length
        ? container && path.includes(container)
        : container && container.contains(e.target as Node);

      if (clickedInsideContainer) return;

      if (typeof isDropdownOpen !== "boolean") {
        setLocalOpen(false);
        setShowLoginPrompt(false);
        setStayOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && typeof isDropdownOpen !== "boolean") {
        setLocalOpen(false);
        setShowLoginPrompt(false);
        setStayOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleDocumentPointer, true);
    document.addEventListener("touchstart", handleDocumentPointer, true);
    document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointer, true);
      document.removeEventListener("touchstart", handleDocumentPointer, true);
      document.removeEventListener("keydown", handleKey, true);
    };
  }, [isDropdownOpen]);

  function onButtonClick(e?: React.MouseEvent) {
    e?.stopPropagation();
    handleLoginClick?.();
    if (user) {
      if (typeof isDropdownOpen !== "boolean") {
        if (open && stayOpen) {
          setLocalOpen(false);
          setStayOpen(false);
        } else {
          setLocalOpen(true);
          setStayOpen(true);
          setShowLoginPrompt(false);
        }
      }
    } else {
      setShowLoginPrompt(true);
      window.setTimeout(() => setShowLoginPrompt(false), 3000);
    }
  }

  function onMouseEnter() {
    if (user && typeof isDropdownOpen !== "boolean" && !stayOpen) {
      setLocalOpen(true);
      setShowLoginPrompt(false);
    }
  }

  function onMouseLeave() {
    if (user && typeof isDropdownOpen !== "boolean" && !stayOpen) {
      setLocalOpen(false);
    }
  }

  function closeMenu() {
    if (typeof isDropdownOpen !== "boolean") {
      setLocalOpen(false);
      setShowLoginPrompt(false);
      setStayOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={onButtonClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
      {user && open && <UserDropMenu menuRef={menuRef} onClose={closeMenu} />}
    </div>
  );
};

export default Usermenu;
