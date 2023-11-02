import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TemplateProps } from "../../../pages/SignInForm/types";
import Footer from "../../../components/Footer";
import styles from "../styles/SignInForm.module.css";
import { SignInFields } from "../../../components/FormFields";
import SignInOutNav from "../../../components/SignInOutNav";
import LeftImage from "../../../components/LeftImage";

const EraSignInProps = ({
  translatedText,
  register,
  onClickSubmit,
  errors,
  brand,
  isShow,
  handleIcon,
  setEmail,
  email,
  setPassword,
  password,
  errMsg,
}: TemplateProps) => {
  return (
    <div className={styles.signInForm}>
      <SignInOutNav
        translatedText={translatedText}
        brand={brand}
        styles={styles}
      />

      <section
        className={`${styles.home} signin ${styles.pos_re}`}
        data-overlay-light3={9}
        id=""
      >
        <div className="container">
          <div className="flex">
            
            <div className="flex-[1_0_0%]">
              <h2>{translatedText.sign_in}</h2>
              <br />
              <br />
              <form className="form" id="contact-form">
                <SignInFields
                  register={register}
                  setEmail={setEmail}
                  translatedText={translatedText}
                  email={email}
                  errors={errors}
                  isShow={isShow}
                  setPassword={setPassword}
                  password={password}
                  handleIcon={handleIcon}
                />
                <div className="inputfield-container">
                  {errors.email?.message && (
                    <div className="errortext">{errors.email.message}</div>
                  )}
                  {errors.password?.message && (
                    <div className="errortext">{errors.password.message}</div>
                  )}
                  <div className="butn-container" onClick={onClickSubmit}>
                    <a className={`${styles.butn} butn`} id="submit-signup">
                      <span>{translatedText.continue}</span>
                    </a>
                  </div>
                </div>
                <br />
                <br />
                <div className={styles.sign_instead}>
                  <p>
                    {translatedText.forgot_password}
                    <Link href="ForgotPassword">
                      <a>{translatedText.click_here}</a>
                    </Link>
                    .
                  </p>
                  <p>
                    {translatedText.no_account_yet}
                    <Link href="SignUpForm">
                      <a>{translatedText.Click_here_to_sign_up}</a>
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
            <LeftImage image={"home_img3"} width={600} height={949} />

          </div>
        </div>
      </section>

      <section className={`${styles.copyright} ${styles.pos_re}`} id="sec4">
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default EraSignInProps;
