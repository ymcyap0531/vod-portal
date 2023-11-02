import React from "react";
import Image from "next/image";

const PaymentGeneric = () => {
  return (
    <>
      <section className="payment_generic" id="">
        <div className="container">
          <div className="popcorn-container">
            <Image
              height={300}
              width={200}
              src="/images/popcorn.png"
              className="popcorn-img"
              alt="popcorn"
            />
            <br />
            <sup>
              <Image
                height={300}
                width={200}
                src="/images/tick.png"
                className="tick-icon"
                alt="tick"
              />
            </sup>
            <h3>Instant Access</h3>
            <br />
            <p>Pay $1 below to start watching instantly</p>
            <br />
          </div>
          <form className="form" id="contact-form">
            {/* <div class="inputfield-container">
                      <input type="text" class="inputfield" id="" placeholder="Full name" />
                  </div>
                  <br> */}
            <div className="inputfield-container">
              <input
                type="text"
                className="inputfield"
                id=""
                placeholder="Card number"
              />
            </div>
            <div className="row card-expiration">
              <div className="col-8 ">
                <div>Expiration</div>
                <div className="row">
                  <div className="col">
                    <input
                      type="tel"
                      className="inputfield"
                      id=""
                      placeholder="Month"
                      maxLength={2}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="tel"
                      className="inputfield"
                      id=""
                      placeholder="Year"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
              <div className="col-4 ">
                <div>CVV2/CVC2</div>
                <input
                  type="tel"
                  className="inputfield"
                  id=""
                  placeholder="ex. 123"
                  maxLength={3}
                />
              </div>
            </div>
            <br />
            <div className="inputfield-container">
              <input
                type="tel"
                className="inputfield"
                id=""
                placeholder="ZIP Code"
              />
            </div>
            <br />
            <div className="cc_logo_container">
              We accept the following credit cards:
              <br />
              <Image
                height={300}
                width={200}
                src="/images/visa-logo.png"
                alt="visa"
              />
              <Image
                height={300}
                width={200}
                src="/images/master-logo.svg"
                alt="mastercard"
              />
              <div className="legal">
                This transaction will appear on your cardholder statement as
                [domain name].
              </div>
            </div>
            <div className="inputfield-container">
              <div className="accverify-legal">
                1 week trial subscription to [domain name] for usd 1, if you
                continue your subscription after the trial period we will
                automatically bill your card for the monthly fee of [monthly
                fee] per month until you cancel your subscription. You will have
                access to the services as long as your subscription is active.
                24/7 customer support is available by phone and email
              </div>
              <br />
              <div className="errortext">This field is required.</div>
              <div className="butn-container">
                <a className="butn" id="">
                  <span>Submit</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* End ====
  ======================================= */}
      {/* bootstrap */}
      {/* custom scripts */}
    </>
  );
};

export default PaymentGeneric;
