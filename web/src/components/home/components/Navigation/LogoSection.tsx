import React from "react";
import Image from "next/image";

const LogoSection = () => {
  return (
    <div>
      {" "}
      <div className="flex items-center">
        <Image
          src="/assets/Images/logo.png"
          alt="Eyoris"
          width={160}
          height={50}
        />
      </div>
    </div>
  );
};

export default LogoSection;
