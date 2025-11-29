import React from "react";
import AccountLinks from "../components/AccountLinks";

export default function AddressPage() {
  const addresses = [
    { id: 'billing', title: 'Billing Address', name: 'Sofia Havertz', phone: '(+1) 234 567 890', address: '345 Long Island, NewYork, United States' },
    { id: 'shipping', title: 'Shipping Address', name: 'Sofia Havertz', phone: '(+1) 234 567 890', address: '345 Long Island, NewYork, United States' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Addresses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your saved addresses for faster checkout.</p>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Add address</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <AccountLinks />
        </aside>

        <main className="lg:col-span-3">
          <div className="space-y-4">
            {addresses.map((a) => (
              <div key={a.id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-sm text-gray-600">{a.name}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-sm px-3 py-1 border rounded-md">Edit</button>
                    <button className="text-sm px-3 py-1 border rounded-md">Delete</button>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <div>{a.phone}</div>
                  <div>{a.address}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
