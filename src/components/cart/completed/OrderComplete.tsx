import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const OrderComplete: React.FC = () => {
  const [activeStep] = useState('complete'); // Assuming this page is only for completed orders

  const getStepClasses = (stepName: string) => {
    const isActive = activeStep === stepName;
    const isComplete = (stepName === 'cart' || stepName === 'checkout') && activeStep === 'complete';

    return {
      circleClasses: `rounded-full w-8 h-8 flex items-center justify-center text-white mr-2 ${
        isComplete ? 'bg-green-500' : (isActive ? 'bg-gray-800' : 'bg-gray-300')
      }`,
      textClasses: `font-semibold ${
        isComplete ? 'text-green-500' : (isActive ? 'text-gray-800' : 'text-gray-500')
      }`,
    };
  };

  const cartStep = getStepClasses('cart');
  const checkoutStep = getStepClasses('checkout');
  const completeStep = getStepClasses('complete');

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-4xl font-bold text-center mb-8">Complete!</h1>

      {/* Progress Indicator */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Cart</h1>
        <div className="flex items-center justify-center space-x-20 mt-3">
          {/* Step 1: Shopping cart */}
          <Link href="/cart">
            <div className="flex flex-col items-center">
              <div className={cartStep.circleClasses}>
                {activeStep === 'cart' ? '1' : '✓'}
              </div>
              <span className={cartStep.textClasses}>Shopping cart</span>
            </div>
          </Link>

          {/* Step 2: Checkout details */}
          <div className="flex flex-col items-center">
            <div className={checkoutStep.circleClasses}>
              {activeStep === 'checkout' ? '2' : (activeStep === 'complete' ? '✓' : '2')}
            </div>
            <span className={checkoutStep.textClasses}>Checkout details</span>
          </div>

          {/* Step 3: Order complete */}
          <div className="flex flex-col items-center">
            <div className={completeStep.circleClasses}>
              {activeStep === 'complete' ? '✓' : '3'}
            </div>
            <span className={completeStep.textClasses}>Order complete</span>
          </div>
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
