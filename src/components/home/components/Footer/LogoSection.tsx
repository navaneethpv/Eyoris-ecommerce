import React from "react";
import Image from "next/image";
const LogoSection = () => {
  return (
    <>
      <div className="flex items-center justify-center mr-10 space-x-2">
        <Image
          src="/logo.png"
          alt="Eyoris Logo"
          width={130}
          height={70}
          className="w-43 h-20"
          
        />
        {/* <h2 className="text-2xl font-bold text-blue-500 drop-shadow-md">Eyoris</h2> */}
      </div>
      <p className="text-sm font-semibold max-w-xs">
        Discover the best deals on fashion, electronics, and home essentials.
        Shop smarter with Eyoris – your one-stop e-commerce destination. Fast
        delivery, secure payment, and 24/7 support.
      </p>
    </>
  );
};

export default LogoSection;
