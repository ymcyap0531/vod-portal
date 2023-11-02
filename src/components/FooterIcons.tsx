import React from "react";
import Image from "next/image";

const FooterIcons = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div>
          <Image
            height={20}
            width={60}
            src="/images/visa-logo.png"
            alt="visa"
          />
        </div>
        <div className="flex justify-center">
          <Image
            height={50}
            width={60}
            src="/images/master-logo.svg"
            alt="mastercard"
          />
        </div>
      </div>
    </>
  );
};

export default FooterIcons;
