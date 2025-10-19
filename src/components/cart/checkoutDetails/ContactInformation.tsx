import React from "react";

const ContactInformation = () => {
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default ContactInformation;
