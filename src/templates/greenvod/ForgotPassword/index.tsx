import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/ForgotPassword/types";
import styles from "../styles/ForgotPassword.module.css";
import LeftImage from "../../../components/LeftImage";
import PwdPageNav from "../../../components/PwdPageNav";

const EraForgotPasswordTemplate = ({
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
    <div className={styles.forgot_password}>
      <PwdPageNav
        styles={styles}
        brand={brand}
        translatedText={translatedText}
      />

      <section
        className={`${styles.home} signin ${styles.pos_re}`}
        data-overlay-dark={0}
        id=""
      >
        <div className="container">
          <div className="flex">
            
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
                        message: translatedText.invalid_email_address,
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
                <div
                  className={`${styles.inputfield_container}`}
                  onClick={onClickSubmit}
                >
                  <div className={styles.butn_container}>
                    <a className={styles.butn} id="submit-signup">
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
            <LeftImage image={"home_img8"} width={600} height={949} />
            
          </div>
        </div>
      </section>
      <section className={`${styles.copyright} copyright ${styles.pos_re} pos-re `} id="sec4">
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default EraForgotPasswordTemplate;
