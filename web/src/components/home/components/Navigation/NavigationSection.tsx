import React from "react";

const Navigation = () => {
  return (
    <div>
      <nav className="hidden lg:flex space-x-8">
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          Category
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          What&apos;s new
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          Deals
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          Delivery
        </a>
      </nav>
    </div>
  );
};

export default Navigation;
