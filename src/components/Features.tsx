import React from 'react';

export default function Features() {
  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"></path></svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Free delivery</h3>
            <p className="text-gray-600">On all orders</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Secure payment</h3>
            <p className="text-gray-600">We ensure secure payment</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">24 x 7 Support</h3>
            <p className="text-gray-600">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
