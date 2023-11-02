import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import { BrandConfigs, Brands, SpecialCategories } from "../../types";
import { requireAuthentication } from "../../RequireAuthentication";
import { getBrand, getTemplate } from "../../utils/filter";
import { TemplateProps } from "./types";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

let Template: React.ComponentType<TemplateProps> | null = null;

export interface FeaturedProps {
  specialCategoriesData: SpecialCategories;
  specialCategoriesResError: any;
  brands: Brands;
  hostName: string;
  brandConfigs: BrandConfigs;
}
const Featured = ({
  specialCategoriesResError,
  specialCategoriesData,
  brands,
  hostName,
  brandConfigs
}: FeaturedProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);

  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Featured`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {}, [specialCategoriesData]);
  if (Template) {
    return (
      <Template
        brand={brand}
        specialCategoriesData={specialCategoriesData}
        specialCategoriesResError={specialCategoriesResError}
      />
    );
  }
  return null;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    const { req, res } = _ctx;
    const token = req.cookies.jwt;
    let hostName;
    if (req) {
      hostName = req.headers.host;
    }
    const myAuthHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    };
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    let specialCategoriesResError;

    const specialCategoriesRes = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/special-categories?populate=%2A`,
        {
          headers: myAuthHeaders,
        }
      )
      .catch((err) => {
        specialCategoriesResError = err.response.status;
      });

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

    if (typeof specialCategoriesRes?.data !== "undefined") {
      return {
        props: {
          specialCategoriesData: specialCategoriesRes.data,
          brands: brandRes.data,
          hostName: hostName,
          specialCategoriesResError: false,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    } else {
      return {
        props: {
          specialCategoriesData: "undefined",
          brands: brandRes.data,
          hostName: hostName,
          specialCategoriesResError: specialCategoriesResError,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    }
  }
);

export default Featured;
