import React from "react";
import Image from "next/image";

const Loader = ({ loader, translatedText, styles }: any) => {
  return (
    <div className="butn-container">
      <a
        className={`${styles.butn} butn flex justify-around`}
        id="submit-signup"
      >
        {loader && <Image src="/images/loader.gif" width="30" height="30" />}
        <span>{loader ? "Processing, please wait" : translatedText}</span>
      </a>
    </div>
  );
};

export default Loader;
