import React from "react";
import Image from "next/image";

import styles from "../styles/Support.module.css";
import Footer from "../../../components/Footer";
import ContactForm from "../../../components/ContactForm";
import Faq from "../../../components/Faq";
import { TemplateProps } from "../../../pages/Support/types";

const EraSupportTemplate = ({
  content,
  faqList,
  translatedText,
  setUserEmail,
  brand,
}: TemplateProps) => {
  return (
    <div className={`${styles.support} red`}>
      <section className={styles.pos_re} data-overlay-dark={0} id="sec3">
        <div className="container">
          <div className="sm:flex">
            <div className="sm:w-5/12 order-md-last">
              {/* <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              <br className="hidden sm:block" /> */}
              <Image
                height={370}
                width={459}
                src="/images/cc_img4.png"
                className=""
                alt="cc_image"
              />
            </div>
            <div className="sm:w-7/12 order-md-first">
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="support list-decimal"
              ></div>
              <br />
              <div className="butn-container">
                <a href="#contactform" className={`${styles.butn} butn`}>
                  <span>{translatedText.goto_contact_form}</span>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section className={`${styles.faq} ${styles.pos_re}`}>
        <div className="container">
          <h3 className="text-darkblue">{translatedText.FAQ}</h3>
          <br />
          <br />
          <h4>{translatedText.general_questions}</h4>
          <div className="row">
            <div className="col">
              {faqList?.data?.map((faq) => {
                if (faq.attributes.questionType === "General questions") {
                  return (
                    <Faq
                      question={faq.attributes.question}
                      answer={faq.attributes.answer}
                      key={faq.id}
                      brand={brand}
                      styles={styles}
                    />
                  );
                }
              })}
            </div>
          </div>
          <br />
          <h4>{translatedText.watching_videos}</h4>
          <div className="row">
            <div className="col">
              {faqList?.data?.map((faq) => {
                if (faq.attributes.questionType === "Watching Videos") {
                  return (
                    <Faq
                      question={faq.attributes.question}
                      answer={faq.attributes.answer}
                      key={faq.id}
                      brand={brand}
                      styles={styles}
                    />
                  );
                }
              })}
            </div>
          </div>
          <br />
          <h4>{translatedText.my_account}</h4>
          <div className="row">
            <div className="col">
              {faqList?.data?.map((faq) => {
                if (faq.attributes.questionType === "My Account") {
                  return (
                    <Faq
                      question={faq.attributes.question}
                      answer={faq.attributes.answer}
                      key={faq.id}
                      brand={brand}
                      styles={styles}
                    />
                  );
                }
              })}
            </div>
          </div>
          <br />
          <h4>{translatedText.billing}</h4>
          <div className="row">
            <div className="col">
              {faqList?.data?.map((faq) => {
                if (faq.attributes.questionType === "Billing") {
                  return (
                    <Faq
                      question={faq.attributes.question}
                      answer={faq.attributes.answer}
                      key={faq.id}
                      brand={brand}
                      styles={styles}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>
            
      <section className={`${styles.contactform}`} data-overlay-dark={0}>
        <ContactForm
          setUserEmail={setUserEmail}
          brand={brand}
          translatedText={translatedText}
          styles={styles}
          image={"home_img4"}
        />
      </section>

      {/* <section className="copyright pos-re"> */}
      <section className={`${styles.copyright} ${styles.pos_re}`}>
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default EraSupportTemplate;
