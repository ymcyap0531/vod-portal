import React from "react";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/Privacy/types";
import styles from "../styles/Privacy.module.css";

const EraPrivacyTemplate = ({ content, brand }: TemplateProps) => {
  return (
    <div className={`border-t-[20px] border-[#e50916] ${styles.privacy}`}>
      <div className={styles.pos_re}>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className={`container ${styles.privacy} px-[15px]`}
        ></div>
      </div>
      <section className={`${styles.copyright} ${styles.pos_re}`} id="sec4">
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default EraPrivacyTemplate;
