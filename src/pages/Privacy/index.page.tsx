import { GetServerSideProps } from "next";
import React, { useEffect, useMemo } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";

import { BrandConfigs, Brands } from "../../types";
import { getBrand, getTemplate, wrapTags } from "../../utils/filter";
import dynamic from "next/dynamic";
import { TemplateProps } from "./types";
import Head from "next/head";

export interface PrivacyProps {
  brands: Brands;
  hostName: string;
  brandConfigs: BrandConfigs;
  brandConfDetails: any;
}

let Template: React.ComponentType<TemplateProps> | null = null;

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

const Privacy = ({ brands, hostName, brandConfigs, brandConfDetails }: PrivacyProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  useEffect(() => {
    document
      .querySelector("body")
      ?.classList.add(`${brand.attributes.template}`);
  }, [brand.attributes.template]);

  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Privacy`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const md = new MarkdownIt();
  let htmlContent;
  if(brandConfDetails?.length > 0 && brandConfDetails[0]?.attributes?.privacyPolicy) {
    htmlContent = md.render(brandConfDetails[0].attributes.privacyPolicy);
  } else{
    htmlContent = md.render(brand.attributes.privacyPolicy);
  }
  const htmlContentText = wrapTags(htmlContent, {
    support_email: `${brand.attributes.supportEmail}`,
    domain_name: `${brand.attributes.name}`,
  });

  if (Template) {
    return (
      <div>
        <Head>
          <title>Video on demand</title>
          <meta name="description" content={brand.attributes.metaDescription} />
          <meta name="keywords" content={brand.attributes.metaKeywords} />
          <link rel="icon" href={`images/${brand.attributes.template}.ico`} />
        </Head>
        <Template content={htmlContentText} brand={brand} />
      </div>
    );
  }
  return null;
};

export default Privacy;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const { req } = _ctx;

  let hostName;
  if (req) {
    hostName = req.headers.host;
  }
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brands/`,
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
      brands          : data,
      hostName        : hostName,
      brandConfigs    : brandConfigsRes.data?.data,
      brandConfDetails: brandConfigsDetailsRes.data?.data
    },
  };
};
