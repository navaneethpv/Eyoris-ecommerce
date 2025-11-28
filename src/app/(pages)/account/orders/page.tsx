import React from "react";
import AccountLinks from "../components/AccountLinks";

export default function OrdersPage() {
  const orders = [
    { id: '#3456_768', date: 'September 17, 2025', status: 'Delivered', total: '$1234' },
    { id: '#3456_980', date: 'September 11, 2025', status: 'Delivered', total: '$345' },
    { id: '#3456_120', date: 'August 24, 2025', status: 'Cancelled', total: '$2345' },
  ];

  const statusClass = (s) => {
    if (s === 'Delivered') return 'text-green-600 bg-green-50';
    if (s === 'Cancelled') return 'text-red-600 bg-red-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Track your past purchases and view their details.</p>
        </div>
        <div>
          <button className="px-4 py-2 border rounded-md">Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <AccountLinks />
        </aside>

        <main className="lg:col-span-3">
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-xs text-gray-500">{order.date}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className={`px-3 py-1 rounded-full text-xs ${statusClass(order.status)}`}>{order.status}</div>
                  <div className="font-semibold">{order.total}</div>
                  <button className="px-3 py-1 border rounded-md">View</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
