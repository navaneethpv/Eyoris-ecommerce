"use client";
import React from "react";
import AccountLinks from "../components/AccountLinks";

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile header card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-semibold">FC</div>
            <div>
              <div className="text-sm text-gray-500">Hello,</div>
              <div className="text-2xl font-bold text-gray-900">John Doe</div>
              <div className="text-sm text-gray-500 mt-1">you@example.com</div>
              <div className="mt-3 flex gap-3 text-sm">
                <div className="px-3 py-1 rounded bg-gray-50 text-gray-700">Orders: <span className="font-medium ml-1">2</span></div>
                <div className="px-3 py-1 rounded bg-gray-50 text-gray-700">Rewards: <span className="font-medium ml-1">₹0</span></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Edit Profile</button>
            <button className="px-4 py-2 border rounded-md">Security</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <AccountLinks />
        </aside>

        <main className="lg:col-span-3">
          <div className="bg-white p-6 rounded-xl shadow">
            <div>
              <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
              <p className="text-sm text-gray-500 mb-4">Update your name and contact details. Changes will be saved to your account.</p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">First name</label>
                    <input placeholder="First name" className="mt-1 w-full border rounded p-2 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Last name</label>
                    <input placeholder="Last name" className="mt-1 w-full border rounded p-2 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600">Display name</label>
                    <input placeholder="Display name" className="mt-1 w-full border rounded p-2 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600">Email</label>
                    <input placeholder="you@example.com" className="mt-1 w-full border rounded p-2 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>

                <div>
                  <h3 className="mt-4 font-semibold">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <input placeholder="Old password" className="border rounded p-2 focus:ring-2 focus:ring-blue-100" />
                    <input placeholder="New password" className="border rounded p-2 focus:ring-2 focus:ring-blue-100" />
                    <input placeholder="Repeat new password" className="border rounded p-2 md:col-span-2 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Save changes</button>
                  <button type="button" className="px-4 py-2 border rounded-md">Cancel</button>
                </div>
              </form>

              <div className="mt-6 text-xs text-gray-500">Tip: Keep your profile up to date to receive personalized recommendations.</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
