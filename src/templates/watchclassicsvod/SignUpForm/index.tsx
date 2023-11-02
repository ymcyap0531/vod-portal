import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/SignUpForm/types";
import styles from "../styles/Styles.module.css";
import signUpFormstyles from "../styles/SignUpForm.module.css";
import Loader from "../../../components/Loader";
import { FormRenderer } from "../../../components/FormRenderer";
import SignInOutNav from "../../../components/SignInOutNav";
import LeftImage from "../../../components/LeftImage";

const ClassicsSignUpFormTemplate = ({
  subscription,
  handleClick,
  trial,
  membership,
  subClick,
  translatedText,
  register,
  onClickSubmit,
  errors,
  handleBlur,
  brand,
  isShow,
  handleIcon,
  initPaymentErr,
  isEmailExist,
  loader,
  signUpFormFields,
  onValueChange,
}: TemplateProps) => {
  return (
    <div className={styles.watch_classics_vod}>
      <SignInOutNav
        translatedText={translatedText}
        brand={brand}
        styles={styles}
      />

      <section
        className={`${styles.home} home signup ${signUpFormstyles.pos_re}`}
        data-overlay-dark2={0}
        id=""
      >
        <div className="container">
          <div className="flex ">
            <LeftImage image={"home_img2"} width={600} height={949} />
            <div className="flex-[1_0_0%]">
              <h2 className={styles.text_primary_color}>
                {translatedText.sign_up_title}
              </h2>
              <br />
              <span className="checkmark-container">
                <span className="checkmark" />
              </span>
              <span className="checktxt">
                {translatedText.ultimate_classic_movie_experience}
              </span>
              <br />
              <span className="checkmark-container">
                <span className="checkmark" />
              </span>
              <span className="checktxt">
                {translatedText.watch_cancel_anytime}
              </span>
              <br />
              <br />
              <h4>{translatedText.choose_your_membership}</h4>
              <label className="radioblock">
                <input
                  type="radio"
                  name="trial"
                  id="member-trial"
                  className="radio"
                  checked={subscription === "trial"}
                  onChange={handleClick}
                />
                <span className="checkmark-radio" />
                <div className="textchoice">{brand.attributes.trial.signupTitle}</div>
              </label>
              <div className="pl-8 text-[#9E9E9E] text-xs">
                {brand.attributes.trial.signupDescription}
              </div>
              <label className="radioblock">
                <input
                  type="radio"
                  name="Buy Directly"
                  id="member-monthly"
                  className="radio"
                  checked={subscription === "Buy Directly"}
                  onChange={handleClick}
                />
                <span className="checkmark-radio" />
                <div className="textchoice">{brand.attributes.membership.signupTitle}</div>
              </label>
              <div className="pl-8 text-[#9E9E9E] text-xs">{brand.attributes.membership.signupDescription}</div>
              {brand.attributes?.fallback && (
              <>
                <label className="radioblock">
                  <input
                    type="radio"
                    name="Fallback"
                    id="member-fallback"
                    className="radio"
                    checked={subscription === "Fallback"}
                    onChange={handleClick}
                  />
                  <span className="checkmark-radio" />
                  <div className="textchoice">{brand.attributes.fallback.signupTitle}</div>
                </label>
                <div className="pl-8 text-[#9E9E9E] text-xs">{brand.attributes.fallback.signupDescription}</div>
              </>
              )}
              <br />
              <form className="form" id="contact-form">
                {signUpFormFields.map((field: any, index: any) => {
                  if (field.fieldRule.type !== "checkbox") {
                    return (
                      <React.Fragment key={index}>
                        <FormRenderer
                          translatedText={translatedText}
                          errors={errors}
                          handleBlur={handleBlur}
                          isShow={isShow}
                          handleIcon={handleIcon}
                          isEmailExist={isEmailExist}
                          type={
                            field.fieldRule.type ? field.fieldRule.type : "text"
                          }
                          fieldName={field.fieldName}
                          minLength={
                            field.fieldRule.minLength
                              ? field.fieldRule.minLength
                              : ""
                          }
                          maxLength={
                            field.fieldRule.maxLength
                              ? field.fieldRule.maxLength
                              : ""
                          }
                          placeholder={
                            translatedText[`placeholder_${field.fieldName}`]
                          }
                          onValueChange={onValueChange}
                        />
                        <br />
                      </React.Fragment>
                    );
                  }
                })}
                <div className="inputfield-container">
                  <div className="legal">
                    <input
                      type="checkbox"
                      {...register("checkbox1", {
                        required: true,
                      })}
                      name="checkbox1"
                      className={
                        errors.checkbox1 ? "checkboxErr checkbox" : "checkbox"
                      }
                    />
                    <span className="checkboxtext">
                      {translatedText.read_and_agree_to_the_website}
                      <Link href="/Terms" passHref>
                        <a target="_blank" className="underline">
                          {translatedText.terms_conditions}
                        </a>
                      </Link>
                      {translatedText.and}
                      <Link href="/Privacy" passHref>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {translatedText.privacy_policy}
                        </a>
                      </Link>
                    </span>
                  </div>
                  <br />
                  {subscription === "" && subClick && (
                    <span className="errortext">
                      {translatedText.please_choose_your_membership}
                    </span>
                  )}
                  {initPaymentErr.length !== 0 && (
                    <span className="errortext">{initPaymentErr}</span>
                  )}
                  {/* <div className="butn-container" onClick={onClickSubmit}>
                    <a className={`${styles.butn} butn`} id="submit-signup">
                      <span>{translatedText.continue}</span>
                    </a>
                  </div> */}
                  <button
                    className="inputfield-container"
                    onClick={onClickSubmit}
                    disabled={initPaymentErr !== "" ? false : loader}
                  >
                    <Loader
                      loader={initPaymentErr !== "" ? false : loader}
                      translatedText={translatedText.continue}
                      styles={styles}
                    />
                  </button>
                  <div className="legal">
                    {translatedText.by_clicking_button_you_agree_our}
                    <Link href="/Terms" passHref>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {translatedText.terms_of_use}
                      </a>
                    </Link>
                    {translatedText.and}
                    <Link href="/Privacy" passHref>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {translatedText.privacy_policy}
                      </a>
                    </Link>
                  </div>
                </div>
                <br />
                <br />
                <div className={signUpFormstyles.sign_instead}>
                  <p>
                    {translatedText.already_have_an_account}
                    <Link href="/SignInForm">
                      <a>{translatedText.sign_in_here}</a>
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.copyright} ${signUpFormstyles.pos_re}`}
        id="sec4"
      >
        <div className="container">
          <Footer brand={brand} />
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
        </div>
      </section>
    </div>
  );
};

export default ClassicsSignUpFormTemplate;
