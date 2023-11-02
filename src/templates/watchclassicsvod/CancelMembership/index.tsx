import React from "react";
import Image from "next/image";
import Link from "next/link";

import { TemplateProps } from "../../../pages/CancelMembership/types";
import Cancel from "../../../components/Cancel";
import Footer from "../../../components/Footer";
import styles from "../styles/Styles.module.css";
import LeftImage from "../../../components/LeftImage";
import IHSNav from "../../../components/IHSNav";

const ClassicsCancelMembershipTemplate = ({
  email,
  supportEmail,
  brand,
  translatedText,
  alreadyCancel,
  cancelSuccess,
  notFound,
}: TemplateProps) => {
  return (
    <div className={styles.watch_classics_vod}>
      <IHSNav styles={styles} brand={brand} translatedText={translatedText} />

      <section
        className={`${styles.home} home signup ${styles.pos_re}`}
        data-overlay-dark2={8}
        id=""
      >
        <div className="container">
          <div className="flex">
            <LeftImage image={"home_img2"} width={360} height={570} />
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

export default ClassicsCancelMembershipTemplate;
