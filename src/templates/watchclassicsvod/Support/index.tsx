import React from "react";
import Image from "next/image";

import styles from "../styles/Styles.module.css";
import supportstyles from "../styles/Support.module.css";
import { TemplateProps } from "../../../pages/Support/types";
import Footer from "../../../components/Footer";
import Faq from "../../../components/Faq";
import ContactForm from "../../../components/ContactForm";

const ClassicsSupportTemplate = ({
  content,
  faqList,
  translatedText,
  setUserEmail,
  brand,
}: TemplateProps) => {
  return (
    <div className={`${styles.watch_classics_vod} bluescroll`}>
      <section className={styles.pos_re} data-overlay-dark2={0} id="sec3">
        <div className="container">
          <div className="sm:flex">
            <div className="sm:w-7/12 md:order-last">
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
            <div className="sm:w-5/12 md:order-first">
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              <Image
                height={370}
                width={459}
                src="/images/cc_img2.png"
                className=""
                alt="cc_image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="faq py-5 md:py-10">
        <div className="container">
          <h3 className="uppercase block text-center">{translatedText.FAQ}</h3>
          <br />
          <br />
          <h4 className={styles.text_primary_color}>
            {translatedText.general_questions}
          </h4>
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
                      styles={supportstyles}
                    />
                  );
                }
              })}
            </div>
          </div>
          <br />
          <h4 className={styles.text_primary_color}>
            {translatedText.watching_videos}
          </h4>
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
                      styles={supportstyles}
                    />
                  );
                }
              })}
            </div>
          </div>
          <br />
          <h4 className={styles.text_primary_color}>
            {translatedText.my_account}
          </h4>
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
                      styles={supportstyles}
                    />
                  );
                }
              })}
            </div>
          </div>
          <br />
          <h4 className={styles.text_primary_color}>
            {translatedText.billing}
          </h4>
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
                      styles={supportstyles}
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
          image={"home_img2"}
        />
      </section>
      
      <section className={`${styles.copyright} ${supportstyles.pos_re}`}>
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default ClassicsSupportTemplate;
