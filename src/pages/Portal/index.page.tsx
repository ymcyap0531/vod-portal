import React, { useState, useEffect, useMemo } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";

import { requireAuthentication } from "../../RequireAuthentication";
import { BrandConfigs, Brands, Movies, TextTranslations } from "../../types";
import dynamic from "next/dynamic";
import { TemplateProps } from "./types";
import { getBrand, getTemplate } from "../../utils/filter";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};
let Template: React.ComponentType<TemplateProps> | null = null;

export interface PortalProps {
  categories: any;
  allMovies: any;
  brands: any;
  hostName: string;
  textTranslation: any;
  catResError: any;
  movieError: any;
  brandConfigs: BrandConfigs;
}
const Portal = ({
  categories,
  allMovies,
  brands,
  hostName,
  textTranslation,
  catResError,
  movieError,
  brandConfigs
}: PortalProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);

  useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Portal`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const router = useRouter();
  const { t } = useTranslation();

  const { category, page } = router.query;
  const [moviesList, setMoviesList] = useState<Movies>();
  const [pageCount, setPageCount] = useState(0);
  const [metaPage, setMetaPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSearchData = () => {
    if (searchValue.length === 0) {
      fetchMovies();
    } else {
      fetchSearchResult(searchValue);
    }
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      if (searchValue.length === 0) {
        fetchMovies();
      } else {
        fetchSearchResult(searchValue);
      }
    }
  };

  const handleChange = (e: any) => {
    if (e.target.value === "All") {
      Router.push(`/Portal?page=1`);
    } else {
      Router.push(`/Portal?category=${e.target.value}&page=1`);
    }
  };

  // const handleClick = (e: any) => {
  //   console.log("e", e);
  //   if (e.target.innerHTML) {
  //     e.currentTarget.style.backgroundColor = "red";
  //   }
  //   // category? [category.toString()].s =
  //   //   submenu.style.display == "block" ? "" : "block";
  // };

  const fetchSearchResult = async (searchValue: string) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/movies/?filters[title][$containsi]=${searchValue}`,
      {
        headers: myHeaders,
      }
    );
    setMoviesList(data);
  };

  const fetchMovies = async () => {
    setMoviesList(allMovies);
    setPageCount(allMovies?.meta?.pagination.pageCount);
    setMetaPage(allMovies?.meta?.pagination.page);
  };

  const fetchCategories = async (category: any) => {
    setMoviesList(categories);
    setPageCount(categories?.meta?.pagination.pageCount);
    setMetaPage(categories?.meta?.pagination.page);
  };

  useEffect(() => {
    if (typeof category === "undefined") {
      fetchMovies();
    } else {
      fetchCategories(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);

  const PortalNavBar = dynamic(() => import("../../components/PortalNavBar"), {
    ssr: false,
  });

  const onClick = (e: any) => {
    Router.push(
      category
        ? `Portal/?category=${category}&page=${parseInt(e.target.innerHTML)}`
        : `Portal/?page=${parseInt(e.target.innerHTML)}`
    );
  };

  if (Template) {
    return (
      <Template
        translatedText={translatedText}
        brand={brand}
        onSearchChange={onSearchChange}
        onSearchData={onSearchData}
        category={category}
        handleChange={handleChange}
        moviesList={moviesList}
        metaPage={metaPage}
        pageCount={pageCount}
        page={page}
        onClick={onClick}
        handleEnter={handleEnter}
        catResError={catResError}
        movieError={movieError}
      />
    );
  }
  return null;
};

export default Portal;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    const { category, page } = _ctx.query;
    const { req, res } = _ctx;
    const token = req.cookies.jwt;
    const myAuthHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let catResError;
    let movieError;

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

    const catRes = await axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/movies?filters[categories][name][$eq]=${category}&pagination[page]=${
          typeof page === "undefined" ? 1 : page
        }&pagination[pageSize]=60`,
        {
          headers: myAuthHeaders,
        }
      )
      .catch((err) => {
        catResError = err.response.status;
      });

    const allMovieRes = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/?pagination[page]=${
          typeof page === "undefined" ? 1 : page
        }&pagination[pageSize]=60`,
        {
          headers: myAuthHeaders,
        }
      )
      .catch((err) => {
        movieError = err.response.status;
      });

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

    if (
      typeof allMovieRes?.data !== "undefined" &&
      typeof catRes?.data !== "undefined"
    ) {
      return {
        props: {
          categories: catRes.data,
          allMovies: allMovieRes.data,
          brands: brandRes.data,
          hostName: hostName,
          textTranslation: textTranslationRes.data,
          catResError: false,
          movieError: false,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    } else {
      return {
        props: {
          categories: "undefined",
          allMovies: "undefined",
          brands: brandRes.data,
          hostName: hostName,
          textTranslation: textTranslationRes.data,
          catResError: catResError,
          movieError: movieError,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    }
  }
);
