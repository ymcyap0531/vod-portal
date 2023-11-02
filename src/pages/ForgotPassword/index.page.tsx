import { useMemo, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { GetServerSideProps } from "next";
import { Articles, BrandConfigs, Brands, TextTranslations } from "../../types";
import { getBrand, getTemplate } from "../../utils/filter";
import dynamic from "next/dynamic";
import { TemplateProps } from "./types";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

export interface ForgotPasswordProps {
  emailNotFound: Articles;
  emailSent: Articles;
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
}

let Template: React.ComponentType<TemplateProps> | null = null;

const ForgotPassword = ({
  emailNotFound,
  emailSent,
  brands,
  hostName,
  textTranslation,
  brandConfigs
}: ForgotPasswordProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/ForgotPassword`)
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const [res, setRes] = useState({ exist: true, sent: false });
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        email: email.toLowerCase(),
        domain: brand.attributes.domainName,
        name: brand.attributes.name,
      })
      .then((response) => {
        // Handle success.
        if (response.data.length === 0) {
          setRes({ ...res, exist: false });
        } else {
          setRes({ ...res, sent: true });
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  const handleBlur = (e: any) => {
    setEmail(e.target.value);
  };

  if (Template) {
    return (
      <Template
        emailNotFound={emailNotFound}
        emailSent={emailSent}
        translatedText={translatedText}
        register={register}
        onClickSubmit={handleSubmit(onSubmit)}
        errors={errors}
        handleBlur={handleBlur}
        res={res}
        brand={brand}
      />
    );
  }
  return null;
};

export default ForgotPassword;

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

  const emailNotFoundRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=emailNotFound`,
    {
      headers: myHeaders,
    }
  );

  const emailSentRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=emailSent`,
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
      emailNotFound: emailNotFoundRes.data,
      emailSent: emailSentRes.data,
      brands: brandRes.data,
      hostName: hostName,
      textTranslation: textTranslationRes.data,
      brandConfigs: brandConfigsRes.data?.data
    },
  };
};
