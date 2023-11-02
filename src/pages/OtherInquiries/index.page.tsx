import React, { useMemo } from "react";
import Router from "next/router";
import { useTranslation } from "react-i18next";

import axios from "axios";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../../RequireAuthentication";
import { BrandConfigs, Brands, TextTranslations } from "../../types";
import { TemplateProps } from "./types";
import { getBrand, getTemplate } from "../../utils/filter";
import dynamic from "next/dynamic";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

export interface OtherInquiriesProps {
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
}

let Template: React.ComponentType<TemplateProps> | null = null;

const OtherInquiries = ({
  brands,
  hostName,
  textTranslation,
  brandConfigs
}: OtherInquiriesProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);

  useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/OtherInquiries`)
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  const { t } = useTranslation();
  const handleClick = () => {
    Router.push("/Portal");
  };

  if (Template) {
    return <Template translatedText={translatedText} brand={brand} />;
  }
  return null;
};

export default OtherInquiries;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const { req } = _ctx;

  let hostName;
  if (req) {
    hostName = req.headers.host;
  }

  const brandRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brands/`,
    {
      headers: myHeaders,
    }
  );

  const textTranslationRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/text-translations`,
    {
      headers: myHeaders,
    }
  );

  const brandConfigsRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-configs`,
    {
      headers: myHeaders,
    }
  );

  return {
    props: {
      brands: brandRes.data,
      hostName: hostName,
      textTranslation: textTranslationRes.data,
      brandConfigs: brandConfigsRes.data?.data
    },
  };
};
