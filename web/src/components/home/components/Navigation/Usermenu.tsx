import React from "react";
interface UsermenuProps {
  isDropdownOpen: boolean;
  handleLoginClick: () => void;
}

const Usermenu:React.FC<UsermenuProps> = ({handleLoginClick,isDropdownOpen}) => {
  return (
    <div>
      <button
        onClick={handleLoginClick}
        className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none hover:cursor-pointer"
      >
        <svg
          className="w-5.5 h-5.5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Login
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Usermenu;
