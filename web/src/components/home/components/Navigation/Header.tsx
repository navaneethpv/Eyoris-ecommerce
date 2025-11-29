"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ImageUploadModal from "../ImageUpload/ImageUploadModal";
import { useCartStore } from "@/store/useCartStore";
import Navigation from "./NavigationSection";
import LogoSection from "./LogoSection";
import TopBar from "./TopBar";
import Search from "./SearchbarSection";
import Usermenu from "./Usermenu";
import UserDropMenu from "./UserDropMenu";
import CartSection from "./CartSection";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isClicked = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useCartStore();

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
            <CartSection cartItems={cartItems} />
          </div>
        </div>
        <ImageUploadModal isOpen={isModalOpen} onClose={closeModal} />
      </header>
    </>
  );
}
