import React, { useState } from "react";

interface PaymentMethodSectionProps {
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSection = ({
  onPaymentMethodChange,
}: PaymentMethodSectionProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState(""); // State for card number
  const [expirationDate, setExpirationDate] = useState(""); // State for expiration date

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const method = event.target.value;
    setSelectedPaymentMethod(method);
    onPaymentMethodChange(method);
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-digits
    const formattedInput = input.match(/.{1,4}/g)?.join(" ") || ""; // Add space every 4 digits
    setCardNumber(formattedInput);
  };

  const handleExpirationDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = event.target.value.replace(/\D/g, ""); // Remove non-digits

    if (input.length > 2) {
      input = input.substring(0, 2) + "/" + input.substring(2, 4);
    }
    setExpirationDate(input);
  };
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Payment method</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="CashOnDelivery"
              name="paymentMethod"
              type="radio"
              className="h-4 w-4 text-blue-600 border-gray-300"
              value="CashOnDelivery"
              checked={selectedPaymentMethod === "CashOnDelivery"}
              onChange={handlePaymentMethodChange}
            />
            <label
              htmlFor="upi"
              className="ml-3 block text-base font-medium text-gray-700"
            >
              Cash on Delivery
            </label>
          </div>

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
              Card Credit
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
              Paypal
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
          {selectedPaymentMethod === "upi" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text" // Changed to text to allow spaces for formatting
                    id="cardNumber"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="yourupi@bank"
                    value={cardNumber}
                    onChange={handleCardNumberChange}

                  />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
