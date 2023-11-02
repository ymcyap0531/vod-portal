import Link from "next/link";
import React from "react";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/ThankYou/types";
import styles from "../styles/ThankYou.module.css";
import Loader from "../../../components/Loader";
import LeftImage from "../../../components/LeftImage";
import IHSNav from "../../../components/IHSNav";

const EraThankYouTemplate = ({
  content,
  translatedText,
  handleClick,
  brand,
  transactionDisplay,
  loader,
}: TemplateProps) => {
  return (
    <div className={styles.thank_you}>
      <IHSNav styles={styles} brand={brand} translatedText={translatedText} />
      <section
        className={`${styles.home} home signup ${styles.pos_re}`}
        data-overlay-light3={9}
        id=""
      >
        <div className="container">
          <div className="flex">
            <LeftImage image={"home_img3"} width={360} height={570} />
            <div className="flex-[1_0_0%]">
              <h2>{translatedText.You_are_all_set}</h2>
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
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
              <div>{transactionDisplay}</div>
              <br />
              <form className="form" id="contact-form">
                <button
                  className="inputfield-container"
                  onClick={handleClick}
                  disabled={loader}
                >
                  <Loader
                    loader={loader}
                    translatedText={translatedText.start_watching}
                    styles={styles}
                  />
                </button>
                {/* <div className="inputfield-container">
                  <div className="butn-container" onClick={handleClick}>
                    <a className={`${styles.butn} butn`} id="submit-signup">
                      <span>{translatedText.start_watching}</span>
                    </a>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.copyright} ${styles.pos_re}`} id="sec4">
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default EraThankYouTemplate;
