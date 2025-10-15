"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ImageUploadModal from "./ImageUploadModal";
import { useCart } from "@/context/CartContext";
import Navigation from "./components/Navigation/NavigationSection";
import LogoSection from "./components/Navigation/LogoSection";
import TopBar from "./components/Navigation/TopBar";
import Search from "./components/Navigation/SearchbarSection";
import Usermenu from "./components/Navigation/Usermenu";
import UserDropMenu from "./components/Navigation/UserDropMenu";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isClicked = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useCart();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLoginClick = () => {
    isClicked.current = !isClicked.current;
    setIsDropdownOpen(isClicked.current);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isClicked.current) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        isClicked.current = false;
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top bar */}
        <TopBar />

        {/* Main header */}
        <div className="container mx-auto flex items-center justify-between py-3 px-4 bg-white z-50">
          {/* Logo */}
          <Link href={"/"}>
            <LogoSection />
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <Search openModal={openModal} />
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Usermenu handleLoginClick={handleLoginClick} isDropdownOpen = {isDropdownOpen} />
              <UserDropMenu isDropdownOpen={isDropdownOpen} />
            </div>
            <Link
              href={"cart"}
              className="flex items-center text-gray-700 hover:text-blue-600 relative"
            >
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div className="absolute w-10 h-10">
                <span className="ml-1 font-bold text-white group-hover:text-blue-500 bg-gray-900 px-1.5 py-0.5 rounded-full">
                  {cartItems
                    ? cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )
                    : 0}
                </span>
              </div>
              Cart
            </Link>
          </div>
        </div>
        <ImageUploadModal isOpen={isModalOpen} onClose={closeModal} />
      </header>
    </>
  );
}
