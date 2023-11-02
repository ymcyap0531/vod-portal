import React from "react";
import Image from "next/image";

const SignUpFormGeneric = () => {
  return (
    <>
      <section className="accverify-section" id="">
        <div className="accverify">
          <div className="accverify-topbar">
            <div className="unlock-logo-container">
              <Image
                height={300}
                width={200}
                src="/images/unlock-icon-blue.png"
                className="unlock-logo"
                alt="unlock-logo"
              />
              <span>Unlock Videos</span>
            </div>
            <div>
              <Image
                height={300}
                width={200}
                src="/images/flags/us.svg"
                className="country-flag"
                alt="flag-logo"
              />
            </div>
          </div>
          <div className="accverify-form">
            <h3>Account Verification</h3>
            <br />
            <label className="radioblock">
              <input
                type="radio"
                name="payradio"
                id="member-trial"
                className="radio"
                // defaultChecked="checked"
              />
              <span className="checkmark-radio" />
              <div className="textchoice">1 Regular Membership $1.00</div>
            </label>
            <div className="reviews-content">
              <div className="reviews-icon">
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star-half-o " />
              </div>
              <span className="reviews-text">&nbsp;1.132.414 reviews</span>
            </div>
            <br />
            <form className="form" id="contact-form">
              <div className="inputfield-container">
                <input
                  type="text"
                  className="inputfield"
                  id="firstname"
                  placeholder="First name"
                />
              </div>
              <br />
              <div className="inputfield-container">
                <input
                  type="text"
                  className="inputfield"
                  id="lastname"
                  placeholder="Last name"
                />
              </div>
              <br />
              <div className="inputfield-container">
                <input
                  type="email"
                  className="inputfield"
                  id="email"
                  placeholder="Email address"
                />
              </div>
              <br />
              <div className="inputfield-container">
                <div className="errortext">This field is required.</div>
                <div className="legal">
                  {/* <input type="checkbox" className="checkbox" defaultChecked="" /> */}
                  <input type="checkbox" className="checkbox" />
                  <span className="checkboxtext">
                    By clicking the button you agree to our{" "}
                    <a href="terms.html" target="_blank">
                      <u>Terms of Use</u>
                    </a>{" "}
                    and{" "}
                    <a href="privacy.html" target="_blank">
                      <u>Privacy Policy</u>
                    </a>{" "}
                    and that my subscription will automatically recur until
                    cancel.
                  </span>
                </div>
                <br />
                <div className="butn-container">
                  <a className="butn" id="">
                    <span>Continue</span>
                  </a>
                </div>
              </div>
              <div className="secure-container">
                <Image
                  height={300}
                  width={200}
                  src="/images/secure_icon.png"
                  className="secure-logo"
                  alt="secure logo"
                />
                <span>256 BIT SSL ENCRYPTION</span>
              </div>
            </form>
          </div>
          <div className="accverify-legal">
            1 week trial subscription to [domain name] for usd 1, if you
            continue your subscription after the trial period we will
            automatically bill your card for the monthly fee of [monthly fee]
            per month until you cancel your subscription. You will have access
            to the services as long as your subscription is active. 24/7
            customer support is available by phone and email. Just call [cc
            phone number] or contact us at [cc email].
            <br />
            <br />
            <a href="privacy.html" target="_blank">
              <u>Privacy Policy</u>
            </a>{" "}
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href="terms.html" target="_blank">
              <u>Terms &amp; Conditions</u>
            </a>{" "}
            &nbsp;&nbsp;
            <br />
            <br />
            Jaeli Declan Stars LLC. 8870 N Himes Ave #104 Tampa, FL 33614.
            <br />
            Copyright © All Rights Reserved.
            <div className="cc_logo_container">
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
            </div>
          </div>
        </div>
      </section>
      {/* End ====
    ======================================= */}
      {/* bootstrap */}
      {/* custom scripts */}
    </>
  );
};

export default SignUpFormGeneric;
