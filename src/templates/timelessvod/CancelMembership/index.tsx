import React from "react";
import Image from "next/image";
import Link from "next/link";

import { TemplateProps } from "../../../pages/CancelMembership/types";
import Cancel from "../../../components/Cancel";
import Footer from "../../../components/Footer";
import styles from "../styles/Styles.module.css";
import LeftImage from "../../../components/LeftImage";
import IHSNav from "../../../components/IHSNav";

const EraCancelMembershipTemplate: React.FC<TemplateProps> = ({
  email,
  supportEmail,
  brand,
  translatedText,
  alreadyCancel,
  cancelSuccess,
  notFound,
}) => {
  return (
    <div className={styles.moviesofera}>
      <IHSNav styles={styles} brand={brand} translatedText={translatedText} />

      <section
        className={`${styles.home} home signup ${styles.pos_re}`}
        data-overlay-dark={8}
        id=""
      >
        <div className="container">
          <div className="flex">
            <LeftImage image={"home_img7"} width={360} height={570} />
            <div className="flex-[1_0_0%] my-auto">
              {email && (
                <Cancel
                  email={email}
                  cancelSuccess={cancelSuccess}
                  alreadyCancel={alreadyCancel}
                  notFound={notFound}
                  supportEmail={supportEmail}
                />
              )}
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

export default EraCancelMembershipTemplate;
