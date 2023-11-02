import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Modal from "../../../components/Modal";
import { TemplateProps } from "../../../pages/Payment/types";
import styles from "../styles/Payment.module.css";
import Loader from "../../../components/Loader";
import { FormRenderer } from "../../../components/FormRenderer";
import LeftImage from "../../../components/LeftImage";
import IHSNav from "../../../components/IHSNav";
import FooterIcons from "../../../components/FooterIcons";

const EraPaymentTemplate = ({
  register,
  onClickSubmit,
  errors,
  brand,
  translatedText,
  paymentTerms,
  transactionDisplay,
  subscription,
  paymentMonthTerms,
  validateCard,
  paymentErr,
  loader,
  paymentFields,
  handleBlur,
  onValueChange,
}: TemplateProps) => {
  return (
    <div className={styles.payment}>
      <IHSNav styles={styles} brand={brand} translatedText={translatedText} />

      <section
        className={`${styles.home} home signup ${styles.pos_re}`}
        data-overlay-dark={8}
        id=""
      >
        <div className="container">
          <div className="flex">

            <div className="flex-[1_0_0%]">
              <h2>{translatedText.secure_payment}</h2>
              <br />
              <div className="flex justify-start items-center -mb-3">
                <div>
                  <Image
                    height={20}
                    width={60}
                    src="/images/visa-logo.png"
                    alt="visa"
                  />
                </div>
                <div>
                  <Image
                    height={50}
                    width={60}
                    src="/images/master-logo.svg"
                    alt="mastercard"
                  />
                </div>
              </div>
              <h4>{translatedText.payment_details}</h4>
              <div className="legal">{transactionDisplay}</div>
              <br />
              <form className="form" id="contact-form">
                {paymentFields.map((field: any, index: any) => {
                  if (Array.isArray(field)) {
                    return (
                      <>
                        <div className="flex justify-between">
                          <div>{translatedText.expiration}</div>
                          <div className="mr-[15px] sm:mr-[100px] md:mr-[40px] lg:mr-[100px]">
                            {"CVV2/CVC2"}
                          </div>
                        </div>
                        <div
                          key={index}
                          className="flex card-expiration space-x-4"
                        >
                          {field.map((field, index) => {
                            if (field.fieldRule.label.item) {
                              return (
                                <div key={index}>
                                  <FormRenderer
                                    translatedText={translatedText}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    type={
                                      field.fieldRule.type
                                        ? field.fieldRule.type
                                        : "text"
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
                                      translatedText[
                                      `placeholder_${field.fieldName}`
                                      ]
                                    }
                                    onValueChange={onValueChange}
                                  />
                                </div>
                              );
                            }
                          })}
                        </div>
                        <br />
                      </>
                    );
                  } else if (field.fieldRule.type !== "checkbox") {
                    return (
                      <div key={index}>
                        <FormRenderer
                          translatedText={translatedText}
                          errors={errors}
                          handleBlur={handleBlur}
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
                      </div>
                    );
                  }
                })}
                <div className={styles.inputfield_container}>
                  <div className="legal">
                    <div>
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
                    <div className="-mt-3.5">
                      <input
                        type="checkbox"
                        className={
                          errors.checkbox2 ? "checkboxErr checkbox" : "checkbox"
                        }
                        {...register("checkbox2", {
                          required: true,
                        })}
                        name="checkbox2"
                      />
                      <span className="checkboxtext">
                        {subscription === "trial"
                          ? paymentTerms
                          : paymentMonthTerms}
                      </span>
                    </div>
                  </div>
                  <br />
                  {paymentErr !== "" && (
                    <div className="errortext text-center">{paymentErr}</div>
                  )}
                  <button
                    className="inputfield-container"
                    onClick={onClickSubmit}
                    id="open-btn"
                    disabled={paymentErr !== "" ? false : loader}
                  >
                    <Loader
                      loader={paymentErr !== "" ? false : loader}
                      translatedText={translatedText.submit}
                      styles={styles}
                    />
                  </button>
                  {/* <div
                    className={styles.butn_container}
                    id="open-btn"
                    onClick={onClickSubmit}
                  >
                    <a className={styles.butn} id="submit-payment">
                      <span>{translatedText.submit}</span>
                    </a>
                  </div> */}
                </div>
              </form>
            </div>
            <LeftImage image={"home_img5"} width={600} height={949} />
          </div>
        </div>
      </section>

      <section className={`${styles.copyright} ${styles.pos_re}`} id="sec4">
        <div className="container">
          <Footer brand={brand} />
          <FooterIcons />
        </div>
      </section>
    </div>
  );
};

export default EraPaymentTemplate;
