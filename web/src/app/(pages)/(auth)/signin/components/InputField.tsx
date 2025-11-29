import React, { ChangeEvent } from "react";

const InputField = ({email, setEmail}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
          type="email"
          required
          className="mt-1 block w-full px-3 py-2.5 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 transition duration-150"
          placeholder="Enter mobile number or email"
        />
      </div>
    </div>
  );
};

export default InputField;
