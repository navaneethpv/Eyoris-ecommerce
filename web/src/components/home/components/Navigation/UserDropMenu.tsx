"use client";

import React from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";

interface UserDropMenuProps {
  menuRef?: React.RefObject<HTMLDivElement>;
  onClose?: () => void;
}

const UserDropMenu: React.FC<UserDropMenuProps> = ({ menuRef, onClose }) => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const [signedOut, setSignedOut] = React.useState(false);

  React.useEffect(() => {
    if (user) setSignedOut(false);
  }, [user]);

  async function handleSignOut() {
    try {
      await signOut();
      setSignedOut(true);
      onClose?.();
    } catch {
      setSignedOut(false);
    }
  }

  const showAsLoggedIn = !!user && !signedOut;

  if (!showAsLoggedIn) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
      role="menu"
    >
      <Link
        href="/account/profile"
        onClick={() => onClose?.()}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        My Profile
      </Link>
      <Link
        href="/account/orders"
        onClick={() => onClose?.()}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Orders
      </Link>
      <Link
        href="/account/wishlist"
        onClick={() => onClose?.()}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Wishlist
      </Link>
      <Link
        href="/account/rewards"
        onClick={() => onClose?.()}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Rewards
      </Link>
      <Link
        href="/account/image-history"
        onClick={() => onClose?.()}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Image history
      </Link>

      <button
        onClick={handleSignOut}
        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserDropMenu;