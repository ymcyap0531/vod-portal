import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/Terms/types";
import styles from "../styles/Terms.module.css";

const EraTermsTemplate = ({ content, brand }: TemplateProps) => {
  return (
    <div className={`border-t-[20px] border-[#ef2774] ${styles.privacy}`}>
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

export default EraTermsTemplate;
