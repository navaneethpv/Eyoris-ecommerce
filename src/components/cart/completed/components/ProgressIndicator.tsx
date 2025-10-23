import React from 'react'
import Link from 'next/link'

type Step = 'cart' | 'checkout' | 'complete';

interface ProgressIndicatorProps {
  activeStep?: Step;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ activeStep = 'complete' }) => {

  const getStepClasses = (stepName: Step) => {
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
    <div>
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
    </div>
  )
}

export default ProgressIndicator