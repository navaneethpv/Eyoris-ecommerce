import React from 'react';
import Image from 'next/image';

const OrderComplete: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Complete!</h1>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center mb-12">
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white mr-2">
            &#x2713;
          </div>
          <span className="text-green-500 font-semibold">Shopping cart</span>
        </div>
        <div className="flex-1 h-1 bg-green-500 mx-4"></div>
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white mr-2">
            &#x2713;
          </div>
          <span className="text-green-500 font-semibold">Checkout details</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-white mr-2">
            3
          </div>
          <span className="text-gray-800 font-semibold">Order complete</span>
        </div>
      </div>

      {/* Order Confirmation Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center">
          Thank you! <span role="img" aria-label="party popper" className="ml-2">🎉</span>
        </h2>
        <p className="text-4xl font-bold mb-8">Your order has been received</p>

        {/* Ordered Items */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="relative">
            <Image src="/assets/Images/catergories/earpod.png" alt="Product 1" width={100} height={100} className="border rounded-lg" />
            <span className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs -mt-2 -mr-2">2</span>
          </div>
          <div className="relative">
            <Image src="/assets/Images/catergories/speaker.png" alt="Product 2" width={100} height={100} className="border rounded-lg" />
            <span className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs -mt-2 -mr-2">2</span>
          </div>
          <div className="relative">
            <Image src="/assets/Images/catergories/accessories.png" alt="Product 3" width={100} height={100} className="border rounded-lg" />
            <span className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs -mt-2 -mr-2">1</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="text-left max-w-xs mx-auto mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order code:</span>
            <span className="font-semibold">#0123_45678</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span className="font-semibold">October 19, 2023</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold">$1,345.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment method:</span>
            <span className="font-semibold">Credit Card</span>
          </div>
        </div>

        {/* Purchase History Button */}
        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Purchase history
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;
