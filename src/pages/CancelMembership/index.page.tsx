import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Articles, BrandConfigs, Brands, TextTranslations } from "../../types";
import { TemplateProps } from "./types";
import { getBrand, getTemplate } from "../../utils/filter";
import dynamic from "next/dynamic";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

export interface CancelMembershipProps {
  cancelSuccess: Articles;
  alreadyCancel: Articles;
  notFound: Articles;
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs:     BrandConfigs;
}
let Template: React.ComponentType<TemplateProps> | null = null;

const CancelMembership = ({
  cancelSuccess,
  alreadyCancel,
  notFound,
  brands,
  hostName,
  textTranslation,
  brandConfigs
}: CancelMembershipProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/CancelMembership`)
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { t } = useTranslation();
  const router = useRouter();
  const email = router.query.email?.toString();
  const supportEmail = `${brand.attributes.supportEmail}`;
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  if (Template) {
    return (
      <Template
        email={email}
        supportEmail={supportEmail}
        brand={brand}
        translatedText={translatedText}
        cancelSuccess={cancelSuccess}
        alreadyCancel={alreadyCancel}
        notFound={notFound}
      />
    );
  }
  return null;
};

export default CancelMembership;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const { req } = _ctx;

  let hostName;
  if (req) {
    hostName = req.headers.host;
  }

  const subNotFoundRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=subNotFound`,
    {
      headers: myHeaders,
    }
  );

  const subAlreadyCancelledRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=subAlreadyCancelled`,
    {
      headers: myHeaders,
    }
  );

  const subCancelledSuccessfullyRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=subCancelledSuccessfully`,
    {
      headers: myHeaders,
    }
  );

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
      cancelSuccess: subCancelledSuccessfullyRes.data,
      alreadyCancel: subAlreadyCancelledRes.data,
      notFound: subNotFoundRes.data,
      brands: brandRes.data,
      hostName: hostName,
      textTranslation: textTranslationRes.data,
      brandConfigs:      brandConfigsRes.data?.data
    },
  };
};
