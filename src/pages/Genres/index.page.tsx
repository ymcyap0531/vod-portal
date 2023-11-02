import React, { useMemo } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import axios from "axios";

import { requireAuthentication } from "../../RequireAuthentication";
import { getBrand, getTemplate } from "../../utils/filter";
import { BrandConfigs, Brands } from "../../types";
import { TemplateProps } from "./types";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

let Template: React.ComponentType<TemplateProps> | null = null;

export interface GenresProps {
  brands: Brands;
  hostName: string;
  brandConfigs: BrandConfigs;
  brandConfDetails: any;
}
const Genres = ({ brands, hostName, brandConfigs, brandConfDetails }: GenresProps) => {
  const categories = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Bollywood",
    "Christmas",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Dutch",
    "Faith Based",
    "Family",
    "Fantasy",
    "Film-Noir",
    "Finnish",
    "Foreign",
    "French",
    "Gay Themed",
    "German",
    "Greek",
    "Hindi",
    "History",
    "Horror",
    "Italian",
    "Japanese",
    "LGBT",
    "Mandarin Chinese",
    "Martial Arts",
    "Music",
    "Musical",
    "Mystery",
    "Portugese",
    "Reality-TV",
    "Religious",
    "Romance",
    "Sci-Fi",
    "Short",
    "Spanish",
    "Sport",
    "Swedish",
    "Talk-Show",
    "Thriller",
    "Trailer",
    "TV Series",
    "Urban",
    "War",
    "Western",
  ];

//ex. Kuwait, Qatar:
const filteredCategories = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Sci-Fi",
    "Short",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const isFilterCategories  = brandConfDetails[0]?.attributes?.filter_categories || false;

  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Genres`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (Template) {
    return <Template 
      brand={brand} 
      categories={isFilterCategories ? filteredCategories : categories} 
    />;
  }
  return null;
};

export default Genres;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    const { req, res } = _ctx;

    let hostName;
    if (req) {
      hostName = req.headers.host;
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
        hostName: hostName,
        brandConfigs: brandConfigsRes.data?.data,
        brandConfDetails: brandConfigsDetailsRes.data?.data
      },
    };
  }
);
