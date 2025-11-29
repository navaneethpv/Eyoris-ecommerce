"use client";
import React from "react";
import Link from "next/link";

const AccountLinks = () => {
  return (
    <nav aria-label="Account navigation" className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Account</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/account/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
        </li>
        <li>
          <Link href="/account/orders" className="text-gray-700 hover:text-blue-600">Orders</Link>
        </li>
        <li>
          <Link href="/account/address" className="text-gray-700 hover:text-blue-600">Addresses</Link>
        </li>
        <li>
          <Link href="/account/wishlist" className="text-gray-700 hover:text-blue-600">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AccountLinks;
