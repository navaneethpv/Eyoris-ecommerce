"use client";
import React from "react";
import Link from "next/link";

interface CartHeaderProps {
  activeStep: 'cart' | 'checkout' | 'complete';
}

export default function CartHeader({ activeStep }: CartHeaderProps) {
  const getStepClasses = (step: 'cart' | 'checkout' | 'complete') => {
    let circleClasses = "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-1";
    let textClasses = "text-sm font-semibold";

    if (step === activeStep) {
      circleClasses += " bg-blue-500 text-white";
      textClasses += " text-blue-500";
    } else if (
      (step === 'cart' && (activeStep === 'checkout' || activeStep === 'complete')) ||
      (step === 'checkout' && activeStep === 'complete')
    ) {
      circleClasses += " bg-green-500 text-white";
      textClasses += " text-green-500";
    } else {
      circleClasses += " bg-gray-300 text-gray-600";
      textClasses += " text-gray-600";
    }
    return { circleClasses, textClasses };
  };

  const cartStep = getStepClasses('cart');
  const checkoutStep = getStepClasses('checkout');
  const completeStep = getStepClasses('complete');

  return (
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
  );
}
