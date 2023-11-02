import Head from "next/head";
// import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import LandingPage from "../components/LandingPage";
import axios from "axios";
import { GetServerSideProps } from "next";
import {
  Articles,
  BrandConfigs,
  Brands,
  SpecialCategories,
  TextTranslations,
} from "../types";
import { getBrand, getTemplate } from "../utils/filter";
import { useEffect } from "react";
import { hostname } from "os";

export interface HomeProps {
  articles:         Articles;
  specialCategories: SpecialCategories;
  brands:           Brands;
  hostName:         string;
  textTranslation:  TextTranslations;
  brandConfigs:     BrandConfigs;
}

export default function Home({
  articles,
  specialCategories,
  brands,
  hostName,
  textTranslation,
  brandConfigs
}: HomeProps) {
  const template  = getTemplate(brands, hostName, brandConfigs);
  const brand     = getBrand(brands, hostName, brandConfigs);

  useEffect(() => {
    document
      .querySelector("body")
      ?.classList.add(`${brand.attributes.template}`);
  }, [brand.attributes.template]);

  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  return (
    <div className={`${styles.container}`}>
      <Head>
        <title>Video on demand</title>
        <meta name="description" content={brand.attributes.metaDescription} />
        <meta name="keywords" content={brand.attributes.metaKeywords} />
        <link rel="icon" href={`images/${brand.attributes.template}.ico`} />
      </Head>

      <main className={`${styles.main}`}>
        <LandingPage
          articles={articles}
          specialCategories={specialCategories}
          template={template}
          brand={brand}
          translatedText={translatedText}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };
  const { req, res } = _ctx;

  let hostName;
  if (req) {
    hostName = "classidel.com"//req.headers.host;
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const brandRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brands/`,
    {
      headers: myHeaders,
    }
  );
  const articleRes = {data: ""}/*await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=homePage`,
    {
      headers: myHeaders,
    }
  );*/

  const specialCategoriesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/special-categories?populate=%2A`,
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
      articles:          articleRes.data,
      specialCategories: specialCategoriesRes.data,
      brands:            brandRes.data,
      hostName:          hostName,
      textTranslation:   textTranslationRes.data,
      brandConfigs:      brandConfigsRes.data?.data
    },
  };
};
