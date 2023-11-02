import Link from "next/link";
import React from "react";
import Image from "next/image";
import { TemplateProps } from "../../../pages/ForgotPassword/types";
import Footer from "../../../components/Footer";
import styles from "../styles/Styles.module.css";
import forgorPasswordstyles from "../styles/ForgotPassword.module.css";
import LeftImage from "../../../components/LeftImage";
import PwdPageNav from "../../../components/PwdPageNav";

const ClassicsForgotPasswordTemplate = ({
  emailNotFound,
  emailSent,
  brand,
  onClickSubmit,
  translatedText,
  errors,
  register,
  handleBlur,
  res,
}: TemplateProps) => {
  return (
    <div className={styles.watch_classics_vod}>
      <PwdPageNav
        styles={styles}
        brand={brand}
        translatedText={translatedText}
      />

      <section
        className={`${styles.home} home signin ${forgorPasswordstyles.pos_re}`}
        data-overlay-dar2k={8}
        id=""
      >
        <div className="container">
          <div className="flex">
            <LeftImage image={"home_img2"} width={600} height={949} />
            <div className="flex-[1_0_0%]">
              <h2>{translatedText.reset_your_password}</h2>
              <p>{translatedText.please_enter_your_email_address_below}</p>
              <br />
              <form className="form" id="contact-form">
                <div className="inputfield-container">
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                      maxLength: 50,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                    className={`inputfield ${
                      errors.password ? "border-red" : "border-green"
                    }`}
                    name="email"
                    placeholder={translatedText.placeholder_email}
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <span className="errortext">
                      {translatedText.email_required}
                    </span>
                  )}
                </div>
                <br />
                <div className="inputfield-container" onClick={onClickSubmit}>
                  <div className="butn-container">
                    <a className={`${styles.butn} butn`} id="submit-signup">
                      <span>{translatedText.continue}</span>
                    </a>
                  </div>
                </div>
              </form>
              {!res.exist && (
                <div>{emailNotFound.data[0].attributes.content}</div>
              )}
              {res.sent && <div>{emailSent.data[0].attributes.content}</div>}
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${styles.copyright} ${forgorPasswordstyles.pos_re}`}
        id="sec4"
      >
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default ClassicsForgotPasswordTemplate;
