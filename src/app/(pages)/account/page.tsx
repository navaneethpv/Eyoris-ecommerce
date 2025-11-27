import React from "react";
import AccountLinks from "./components/AccountLinks";

export default function AccountPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your profile, orders, and settings.</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <AccountLinks />
        </aside>

        <section className="lg:col-span-3">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Welcome back,</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-medium">Recent Orders</h3>
                <p className="text-sm text-gray-500 mt-2">You have no recent orders.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-medium">Account Settings</h3>
                <p className="text-sm text-gray-500 mt-2">Update your personal information, password, and address.</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold mb-3">Quick actions</h3>
              <div className="flex gap-3 flex-wrap">
                <a className="px-4 py-2 bg-blue-600 text-white rounded-md" href="/account/profile">Edit Profile</a>
                <a className="px-4 py-2 bg-gray-100 rounded-md" href="/account/orders">View Orders</a>
                <a className="px-4 py-2 bg-gray-100 rounded-md" href="/account/address">Manage Addresses</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
