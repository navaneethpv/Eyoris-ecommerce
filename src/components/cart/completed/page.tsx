import React from 'react';
import Image from 'next/image';
import ProgressIndicator from './components/ProgressIndicator';

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  imageUrl: string;
  color: string;
}

interface OrderData {
  cartItems: CartItem[];
  total: number;
  paymentMethod: string;
  orderCode: string;
  orderDate: string;
}

interface OrderCompleteProps {
  orderData: OrderData;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({ orderData }) => {

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-4xl font-bold text-center mb-8">Complete!</h1>

      {/* Progress Indicator */}
      <ProgressIndicator />
      

      {/* Order Confirmation Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center">
          Thank you! <span role="img" aria-label="party popper" className="ml-2">🎉</span>
        </h2>
        <p className="text-4xl font-bold mb-8">Your order has been received</p>

        {/* Ordered Items */}
        <div className="flex justify-center space-x-6 mb-8">
          {orderData.cartItems.map((item) => (
            <div key={item.id} className="relative">
              <Image src={item.imageUrl} alt={item.name} width={100} height={100} className="border rounded-lg" />
              <span className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs -mt-2 -mr-2">{item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Order Details */}
        <div className="text-left max-w-xs mx-auto mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order code:</span>
            <span className="font-semibold">{orderData.orderCode}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span className="font-semibold">{orderData.orderDate}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold">₹{orderData.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment method:</span>
            <span className="font-semibold">{orderData.paymentMethod === 'cardCredit' ? 'Credit Card' : orderData.paymentMethod === 'paypal' ? 'PayPal' : 'UPI'}</span>
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
