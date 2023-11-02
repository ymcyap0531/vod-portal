import React, { useEffect, useMemo, useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from "nookies";
import { GetServerSideProps } from "next";

import { useStore } from "../../utils/userManager";
import { BrandConfigs, Brands, TextTranslations } from "../../types";
import { getBrand, getTemplate, wrapTags } from "../../utils/filter";
import dynamic from "next/dynamic";
import { TemplateProps } from "./types";
import Head from "next/head";

export interface Inputs {
  password: string;
  email: string;
}

export interface SignInFormProps {
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

const Login = ({ brands, hostName, textTranslation, brandConfigs }: SignInFormProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const router = useRouter();

  const { pwd, username } = router.query;

  const [errMsg, setErrMsg] = useState(false);
  const { setUsername, setId, setEmail, email } = useStore();
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Login`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const loginUser = async (loginInfo: any, emailId: any) => {
    const userDetails = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users?filters[email][$eq]=${emailId}`,
      {
        headers: myHeaders,
      }
    );

    if (
      userDetails.data[0]?.domain === brand.attributes.domainName ||
      userDetails.data[0]?.domain === null
    ) {
      try {
        const login = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local/`,
          loginInfo
        );
        setEmail(login.data.user.email);
        setUsername(login.data.user.username);
        setId(login.data.user.id);

        if (!login.data.user.blocked) {
          setCookie(null, "jwt", login.data.jwt, {
            // maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
        }
        setErrMsg(false);

        Router.push("/Portal/?page=1");
      } catch (err) {
        setErrMsg(true);
      }
    } else {
      setErrMsg(true);
    }
  };

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      const loginInfo = {
        //@ts-ignore
        identifier: username.toLowerCase(),
        //@ts-ignore
        password: decodeURIComponent(pwd),
      };
      //@ts-ignore
      loginUser(loginInfo, username.toLowerCase());
    }
  }, [username, pwd]);

  useEffect(() => {
    document
      .querySelector("body")
      ?.classList.add(`${brand.attributes.template}`);
  }, [brand.attributes.template]);

  if (Template) {
    return (
      <div>
        <Head>
          <title>Video on demand</title>
          <meta name="description" content={brand.attributes.metaDescription} />
          <meta name="keywords" content={brand.attributes.metaKeywords} />
          <link rel="icon" href={`images/${brand.attributes.template}.ico`} />
        </Head>
        <Template translatedText={translatedText} />
      </div>
    );
  }
  return null;
};

export default Login;

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
