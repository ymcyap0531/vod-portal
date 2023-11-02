import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import Head from "next/head";

import { getBrand, getTemplate, wrapTags } from "../../utils/filter";
import { useStore } from "../../utils/userManager";
import { Articles, BrandConfigs, Brands, Faqs, TextTranslations } from "../../types";
import { GetServerSideProps } from "next";
import MarkdownIt from "markdown-it";
import { TemplateProps } from "./types";
import { off } from "process";

export interface SupportProps {
  faqList: Faqs;
  brands: Brands;
  article: Articles;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
  brandConfDetails: any;
}
let Template: React.ComponentType<TemplateProps> | null = null;

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

const Support = ({
  brands,
  faqList,
  article,
  hostName,
  textTranslation,
  brandConfigs, 
  brandConfDetails
}: SupportProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);

  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Support`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [userEmail, setUserEmail] = useState("");
  const { setIsValid, setIsBlocked, setOrderId } = useStore();
  const { t } = useTranslation();

  const md = new MarkdownIt();
  let htmlContent;
  if(brandConfDetails?.length > 0 && brandConfDetails[0]?.attributes?.customerSupport) {
    htmlContent = md.render(brandConfDetails[0].attributes.customerSupport);
  } else{
    htmlContent = md.render(article?.data[0].attributes.content);
  }

  const htmlContentText = wrapTags(htmlContent, {
    support_email: `${brand.attributes.supportEmail}`,
    domain_name: `${brand.attributes.name}`,
    support_number: `${brand.attributes.supportNumber}`,
  });
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  const fetchUser = async (email: string) => {
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users?filters[blocked][$eq]=false&filters[email][$eq]=${email}`,
      {
        headers: myHeaders,
      }
    );

    if (userRes.data.length === 0) {
      setIsValid(false);
    } else {
      setOrderId(userRes.data[0].orderId);
      setIsValid(true);
      setIsBlocked(userRes.data[0].blocked);
    }
  };
  useEffect(() => {
    document
      .querySelector("body")
      ?.classList.add(`${brand.attributes.template}`);
  }, [brand.attributes.template]);

  useEffect(() => {
    if (userEmail !== "") {
      fetchUser(userEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  if (Template) {
    return (
      <div>
        <Head>
          <title>Video on demand</title>
          <meta name="description" content={brand.attributes.metaDescription} />
          <meta name="keywords" content={brand.attributes.metaKeywords} />
          <link rel="icon" href={`images/${brand.attributes.template}.ico`} />
        </Head>
        <Template
          content={htmlContentText}
          faqList={faqList}
          translatedText={translatedText}
          setUserEmail={setUserEmail}
          brand={brand}
        />
      </div>
    );
  }
  return null;
};

export default Support;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const { req } = _ctx;

  const brandRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brands/`,
    {
      headers: myHeaders,
    }
  );

  const faqRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faqs/`, {
    headers: myHeaders,
  });

  const articleRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=customerSupport`,
    {
      headers: myHeaders,
    }
  );

  let hostName;
  if (req) {
    hostName = req.headers.host;
  }

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

  // @ts-ignore
  const baseHostName  = hostName.replace("www.", "")?.split(".");
  const subdomain     = baseHostName[0];
  const domain        = baseHostName[1]?.startsWith("localhost") 
      ? `${process.env.NEXT_PUBLIC_LOCAL_DOMAIN}`.split(".")[0]
      : baseHostName[1];

  const brandConfigsDetailsRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-configs?populate=*&filters[country_code][$eq]=${subdomain}&filters[brand][template][$eq]=${domain}`,
    {
      headers: myHeaders,
    }
  );

  return {
    props: {
      brands: brandRes.data,
      faqList: faqRes.data,
      article: articleRes.data,
      hostName: hostName,
      textTranslation: textTranslationRes.data,
      brandConfigs: brandConfigsRes.data?.data,
      brandConfDetails: brandConfigsDetailsRes.data?.data
    },
  };
};
