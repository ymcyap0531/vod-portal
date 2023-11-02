import React from "react";
import Image from "next/image";

const ThankYouGeneric = () => {
  return (
    <>
      <section className="thankyou_generic" id="">
        <h2>Well done!</h2>
        <br />
        <br />
        Your Account has been activated.
        <br />
        <div className="legal">Your card will be charged as [domain name].</div>
        <br />
        <div className="butn-container">
          <a className="butn" id="">
            <span>Start Watching</span>
          </a>
        </div>
        <br />
        <Image
          height={300}
          width={200}
          src="/images/popcorn.png"
          className="popcorn-img"
          alt="popcorn image"
        />
      </section>
    </>
  );
};

export default ThankYouGeneric;
