import axios from "axios";
import { GetServerSideProps } from "next";
import { useMemo } from "react";
import dynamic from "next/dynamic";

import { requireAuthentication } from "../../RequireAuthentication";
import { BrandConfigs, Brands, Movies } from "../../types";
import { getTemplate } from "../../utils/filter";
import { GenreTypeTemplateProps } from "./genretypes";

export interface GenreTypeProps {
  moviesList: Movies;
  category: string;
  hostName: string;
  brands: Brands;
  movieResError: any;
  brandConfigs: BrandConfigs;
}

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

let Template: React.ComponentType<GenreTypeTemplateProps> | null = null;

const GenreType = (props: GenreTypeProps) => {
  const { moviesList, category, hostName, brands, movieResError, brandConfigs } = props;
  const template = getTemplate(brands, hostName, brandConfigs);

  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/GenreType`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (Template) {
    return (
      <Template
        moviesList={moviesList}
        category={category}
        movieResError={movieResError}
      />
    );
  }
  return null;
};

export default GenreType;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    const { req } = _ctx;

    let hostName;
    if (req) {
      hostName = req.headers.host;
    }
    const token = req.cookies.jwt;
    const myAuthHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    };

    const category = _ctx.query.GenreType;

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

    let movieResError;
    const movieRes = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/movies?filters[categories][name][$eq]=${category}`,
        { headers: myAuthHeaders }
      )
      .catch((err) => {
        movieResError = err.response.status;
      });

    if (typeof movieRes?.data !== "undefined") {
      return {
        props: {
          moviesList: movieRes.data,
          category: category,
          hostName: hostName,
          brands: brandRes.data,
          movieResError: false,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    } else {
      return {
        props: {
          moviesList: "undefied",
          category: category,
          hostName: hostName,
          brands: brandRes.data,
          movieResError: movieResError,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    }
  }
);
