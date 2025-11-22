import React from "react";
import Link from "next/link";
const AccountSection = () => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Account</h3>
      <ul className="text-sm space-y-2">
        <li>My Account</li>
        <li>Login / Register</li>
        <Link href={"/cart"}><li>Cart</li></Link>
        <li>Wishlist</li>
        <li>Shop</li>
      </ul>
    </div>
  );
};

export default AccountSection;
