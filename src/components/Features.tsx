import React from 'react';

export default function Features() {
  return (
    <section className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v1m0-9.993V10m0 2.007V12m0 0H9m3 0h3m-3 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Free delivery</h3>
            <p className="text-gray-600">On all orders</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c0 2.873.811 5.66 2.372 8.016A11.955 11.955 0 0112 21.056a11.955 11.955 0 018.618-3.04A12.007 12.007 0 0021.056 12c0-2.873-.811-5.66-2.372-8.016z" /></svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Secure payment</h3>
            <p className="text-gray-600">We ensure secure payment</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">24 x 7 Support</h3>
            <p className="text-gray-600">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
