import React from "react";

const InputField = () => {
  return (
    <div>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 transition duration-150"
          placeholder="Enter mobile number or email"
        />
      </div>
    </div>
  );
};

export default InputField;
