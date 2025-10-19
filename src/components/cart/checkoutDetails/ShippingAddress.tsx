import React, { useState } from "react";

const ShippingAddress = () => {
  const [selectedState, setSelectedState] = useState("");
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  return (
    <div>
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
    </div>
  );
};

export default ShippingAddress;
