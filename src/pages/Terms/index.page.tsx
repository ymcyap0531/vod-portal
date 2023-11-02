import { GetServerSideProps } from "next";
import React, { useEffect, useMemo } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";

import { BrandConfigs, Brands } from "../../types";
import { wrapTags, getTemplate, getBrand } from "../../utils/filter";
import Head from "next/head";

export interface TermsProps {
  brands: Brands;
  // trial: { days: number; amount: number };
  // membership: { days: number; amount: number };
  hostName: string;
  brandConfigs: BrandConfigs;
  brandConfDetails: any;
}
let Template: React.ComponentType<any> | null = null;
const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

const Terms = ({ brands, hostName, brandConfigs, brandConfDetails }: TermsProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);

  useEffect(() => {
    document
      .querySelector("body")
      ?.classList.add(`${brand.attributes.template}`);
  }, [brand.attributes.template]);

  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Terms`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const md = new MarkdownIt();
  let htmlContent;
  if(brandConfDetails?.length > 0 && brandConfDetails[0]?.attributes?.tAndC) {
    htmlContent = md.render(brandConfDetails[0].attributes.tAndC);
  } else{
    htmlContent = md.render(brand.attributes.tAndC);
  }
  const htmlContentText = wrapTags(htmlContent, {
    trial_days: `${brand.attributes.trial.days}`,
    trial_amount: `${brand.attributes.trial.amount}`,
    membership_days: `${brand.attributes.membership.days}`,
    membership_amount: `${brand.attributes.membership.amount}`,
    fallback_days: `${brand.attributes.fallback?.days}`,
    fallback_amount: `${brand.attributes.fallback?.amount}`,
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

export default Terms;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const { req } = _ctx;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brands/`,
    {
      headers: myHeaders,
    }
  );

  let hostName;
  if (req) {
    hostName = req.headers.host;
  }

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

  // const trial = { days: 2, amount: 1 };
  // const membership = { days: 14, amount: 29.99 };

  return {
    props: {
      brands: data,
      // trial: trial,
      // membership: membership,
      hostName        : hostName,
      brandConfigs    : brandConfigsRes.data?.data,
      brandConfDetails: brandConfigsDetailsRes.data?.data
    },
  };
};
