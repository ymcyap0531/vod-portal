import React from "react";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/Terms/types";
import styles from "../styles/Terms.module.css";

const ClassicsTermsTemplate = ({ content, brand }: TemplateProps) => {
  return (
    <div
      className={`border-t-[20px] ${styles.border_primary_color} ${styles.privacy2}`}
    >
      <div className={`${styles.pos_re} text-center`}>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="container privacy2 px-[15px]"
        ></div>
      </div>
      <section className={`${styles.copyright} ${styles.pos_re}`} id="sec4">
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default ClassicsTermsTemplate;
