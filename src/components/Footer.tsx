import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { Brand } from "../types";

export interface FooterProps {
  brand: Brand;
}
const Footer = ({ brand }: FooterProps) => {
  const { t } = useTranslation();
  const QuantCast = dynamic(() => import("./QuantCast"), {
    ssr: false,
  });

  return (
    <section className="text-center" id="sec4">
      <div className="container">
        <div className="logo-container">
          <Image
            height={30}
            width={160}
            src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/${brand.attributes.template}/logo.png`}
            alt="logo"
          />
        </div>
        <p>
          <Link href="/Privacy" passHref>
            <a target="_blank" rel="noopener noreferrer">
              {t("privacy_policy")}
            </a>
          </Link>{" "}
             |   
          <Link href="/Terms" passHref>
            <a target="_blank" rel="noopener noreferrer">
              {t("terms_conditions")}
            </a>
          </Link>
             |   
          <Link href="/Support" passHref>
            <a target="_blank" rel="noopener noreferrer">
              {t("support_footer")}
            </a>
          </Link>
        </p>
        <br />
        <p>
          {brand.attributes.address}
          <br />
          Copyright © All Rights Reserved.
        </p>
      </div>
      <QuantCast />
    </section>
  );
};

export default Footer;
