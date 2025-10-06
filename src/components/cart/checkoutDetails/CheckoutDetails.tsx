"use client";
import React, { useState } from "react";
import CartHeader from "../shopingCart/Header";

interface CheckoutDetailsProps {
  onOrderComplete: (data: { paymentMethod: string }) => void;
}

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function CheckoutDetails({ onOrderComplete }: CheckoutDetailsProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("cardCredit"); // Default to card credit
  const [selectedState, setSelectedState] = useState(""); // State for selected Indian state
  const [cardNumber, setCardNumber] = useState(""); // State for card number
  const [expirationDate, setExpirationDate] = useState(""); // State for expiration date

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, ''); // Remove non-digits
    const formattedInput = input.match(/.{1,4}/g)?.join(' ') || ''; // Add space every 4 digits
    setCardNumber(formattedInput);
  };

  const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replace(/\D/g, ''); // Remove non-digits

    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    setExpirationDate(input);
  };

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <CartHeader activeStep="checkout" />
        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                FIRST NAME
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="First name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                LAST NAME
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Last name"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                PHONE NUMBER
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="emailAddress"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Your Email"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-700"
              >
                STREET ADDRESS *
              </label>
              <input
                type="text"
                id="streetAddress"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Street Address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="townCity"
                  className="block text-sm font-medium text-gray-700"
                >
                  TOWN / CITY *
                </label>
                <input
                  type="text"
                  id="townCity"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Town / City"
                />
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP CODE
                </label>
                <input
                  type="text"
                  id="zipCode"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Zip Code"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                STATE
              </label>
              <select
                id="state"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                id="differentBillingAddress"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="differentBillingAddress"
                className="ml-2 block text-sm text-gray-900"
              >
                Use a different billing address (optional)
              </label>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Payment method</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="payByCardCredit"
                name="paymentMethod"
                type="radio"
                className="h-4 w-4 text-blue-600 border-gray-300"
                value="cardCredit"
                checked={selectedPaymentMethod === "cardCredit"}
                onChange={handlePaymentMethodChange}
              />
              <label
                htmlFor="payByCardCredit"
                className="ml-3 block text-base font-medium text-gray-700"
              >
                Pay by Card Credit
              </label>
            </div>
            {selectedPaymentMethod === "cardCredit" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CARD NUMBER
                  </label>
                  <input
                    type="text" // Changed to text to allow spaces for formatting
                    id="cardNumber"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="1234 1234 1234 1234"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19} // 16 digits + 3 spaces
                  />
                </div>
                <div>
                  <label
                    htmlFor="expirationDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    EXPIRATION DATE
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="MM/YY"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    maxLength={5} // MM/YY
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="CVC code"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center">
              <input
                id="paypal"
                name="paymentMethod"
                type="radio"
                className="h-4 w-4 text-blue-600 border-gray-300"
                value="paypal"
                checked={selectedPaymentMethod === "paypal"}
                onChange={handlePaymentMethodChange}
              />
              <label
                htmlFor="paypal"
                className="ml-3 block text-base font-medium text-gray-700"
              >
                Pay by Paypal
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="upi"
                name="paymentMethod"
                type="radio"
                className="h-4 w-4 text-blue-600 border-gray-300"
                value="upi"
                checked={selectedPaymentMethod === "upi"}
                onChange={handlePaymentMethodChange}
              />
              <label
                htmlFor="upi"
                className="ml-3 block text-base font-medium text-gray-700"
              >
                UPI
              </label>
            </div>
          </div>
        </div>

        <button
          className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold"
          onClick={() => onOrderComplete({ paymentMethod: selectedPaymentMethod })}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
