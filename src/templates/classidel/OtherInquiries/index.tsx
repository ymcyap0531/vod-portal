import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TemplateProps } from "../../../pages/OtherInquiries/types";
import Other from "../../../components/Other";
import Footer from "../../../components/Footer";
import styles from "../styles/OtherInquiries.module.css";
import LeftImage from "../../../components/LeftImage";
import IHSNav from "../../../components/IHSNav";

const EraOtherInquiriesTemplate = ({
  translatedText,
  brand,
}: TemplateProps) => {
  return (
    <div className={styles.other_inquiries}>
      <IHSNav styles={styles} brand={brand} translatedText={translatedText} />

      <section
        className={`${styles.home} home signup ${styles.pos_re}`}
        data-overlay-dark={8}
        id=""
      >
        <div className="container">
          <div className="flex">
            <LeftImage image={"home_5"} width={360} height={570} />
            <div className="flex-[1_0_0%] my-auto">
              <Other />
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

export default EraOtherInquiriesTemplate;
