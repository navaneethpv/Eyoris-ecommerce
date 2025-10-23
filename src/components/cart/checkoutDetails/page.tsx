"use client";
import React, { useState } from "react";
import CartHeader from "../shopingCart/Header";
import ContactInformation from "./ContactInformation";
import ShippingAddress from "./ShippingAddress";
import PaymentMethodSection from "./PaymentMethodSection";

interface CheckoutDetailsProps {
  onOrderComplete: (data: { paymentMethod: string }) => void;
}

export default function CheckoutDetails({
  onOrderComplete,
}: CheckoutDetailsProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <CartHeader activeStep="checkout" />
        {/* Contact Information */}
        <ContactInformation />

        {/* Shipping Address */}
        <ShippingAddress />

        {/* Payment Method */}
        <PaymentMethodSection
          onPaymentMethodChange={setSelectedPaymentMethod}
        />

        <button
          className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors mt-6 hover:cursor-pointer"
          onClick={() =>
            onOrderComplete({ paymentMethod: selectedPaymentMethod })
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
