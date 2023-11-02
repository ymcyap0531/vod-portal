import React from "react";
import Image from "next/image";

const LeftImage = ({ image, width, height }: any) => {
  return (
    <>
      <div className="home_img flex-[1_0_0%]">
        <Image
          height={height}
          width={width}
          src={`/images/${image}.png`}
          alt="home image"
        />
      </div>
    </>
  );
};

export default LeftImage;
