import React, { useMemo, useState } from "react";
import Router from "next/router";
import { useTranslation } from "react-i18next";
import MarkdownIt from "markdown-it";

import { GetServerSideProps } from "next";
import axios from "axios";
import { Articles, BrandConfigs, Brands, TextTranslations } from "../../types";
import { getBrand, getTemplate, wrapTags } from "../../utils/filter";
import dynamic from "next/dynamic";
import { TemplateProps } from "./types";
import { useStore } from "../../utils/userManager";

export interface ThankYouProps {
  article: Articles;
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
}

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

let Template: React.ComponentType<TemplateProps> | null = null;

const ThankYou = ({
  article,
  brands,
  hostName,
  textTranslation,
  brandConfigs
}: ThankYouProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const { t } = useTranslation();
  const { email, pwd } = useStore();
  const [loader, setLoader] = useState<boolean>(false);
  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/ThankYou`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const md = new MarkdownIt();
  const htmlContent = md.render(article?.data[0].attributes.content);
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);

  const transactionDisplay = wrapTags(
    t("transaction_will_appear_on_your_cardholder_statement_as"),
    {
      support_number: `${brand.attributes.supportNumber}`,
      domain: `${brand.attributes.domainName}`,
    }
  );
  const handleClick = () => {
    Router.push(`/Login/?username=${email}&pwd=${encodeURIComponent(pwd)}`);
    setLoader(true);
  };

  if (Template) {
    return (
      <Template
        translatedText={translatedText}
        transactionDisplay={transactionDisplay.replace(" +1", "")}
        content={htmlContent}
        handleClick={handleClick}
        brand={brand}
        loader={loader}
      />
    );
  }
  return null;
};

export default ThankYou;

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
  const articleRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=thankYou`,
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
      article: articleRes.data,
      brands: brandRes.data,
      hostName: hostName,
      textTranslation: textTranslationRes.data,
      brandConfigs: brandConfigsRes.data?.data
    },
  };
};
