import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

import {
  BrandConfigs,
  Brands,
  Categories,
  Movie,
  Movies,
  TextTranslations,
} from "../../types";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../../RequireAuthentication";
import { getBrand, getTemplate } from "../../utils/filter";
import { TemplateProps } from "./types";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
// const PortalNavBar = dynamic(() => import("../components/PortalNavBar"), {
//   ssr: false,
// });

export interface WatchMovieProps {
  categories: Categories;
  movie: Movie;
  recommendCategory: Movies;
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  recommendResError: any;
  movieResError: any;
  brandConfigs: BrandConfigs;
}
let Template: React.ComponentType<TemplateProps> | null = null;

const WatchMovie = ({
  categories,
  movie,
  recommendCategory,
  brands,
  hostName,
  textTranslation,
  recommendResError,
  movieResError,
  brandConfigs
}: WatchMovieProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);

  useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/WatchMovie`)
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { t } = useTranslation();
  const player = useRef(null);
  const [seeking, setSeeking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [seek, setSeek] = useState(0);
  const [played, setPlayed] = useState(seek);
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  useEffect(() => {}, [categories, movie, recommendCategory]);

  const handleProgress = (progress: any) => {
    return progress;
  };

  const onProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    if (seeking) return;
    // setPlayedStr(GetTimeStr(state.playedSeconds));
    // setTotalTimeStr(GetTimeStr(state.loadedSeconds));
    setProgress(state.played);
  };

  const handleSeek = (p: any) => {
    setSeeking(true);
    setSeek(p);
    setPlayed(p);
    if (player.current !== null) {
      // player.current.seekTo(p);
    }
    setTimeout(() => setSeeking(false), 800);
  };

  const onplay = () => {
    handleSeek(0);

    // player?.current.seekTo(100));
  };

  const handleDuration = (duration: any) => {
    handleSeek(0);
  };
  useEffect(() => {}, [movie?.attributes?.movie_url]);

  if (Template) {
    return (
      <Template
        translatedText={translatedText}
        brand={brand}
        movie={movie}
        categories={categories}
        recommendCategory={recommendCategory}
        recommendResError={recommendResError}
        movieResError={movieResError}
      />
    );
  }
  return null;
};

export default WatchMovie;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    const { id } = _ctx.query;
    const category = "Recommended";
    const { req } = _ctx;

    let hostName;
    if (req) {
      hostName = req.headers.host;
    }

    const token = req.cookies.jwt;
    const myAuthHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let recommendResError;
    let movieResError;
    const brandRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/brands/`,
      {
        headers: myHeaders,
      }
    );
    const categoryRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories?filters[movies][id][$eq]=${id}`,
      {
        headers: myHeaders,
      }
    );

    const recommendRes = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/movies?filters[special_categories][name][$eq]=${category}`,
        {
          headers: myAuthHeaders,
        }
      )
      .catch((err) => {
        recommendResError = err.response.status;
      });

    const movieRes = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
        headers: myAuthHeaders,
      })
      .catch((err) => {
        movieResError = err.response.status;
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
      typeof recommendRes?.data !== "undefined" &&
      typeof movieRes?.data !== "undefined"
    ) {
      return {
        props: {
          categories: categoryRes.data,
          recommendCategory: recommendRes.data,
          movie: movieRes.data.data,
          brands: brandRes.data,
          hostName: hostName,
          textTranslation: textTranslationRes.data,
          recommendResError: false,
          movieResError: false,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    } else {
      return {
        props: {
          categories: categoryRes.data,
          recommendCategory: "undefined",
          movie: "undefined",
          brands: brandRes.data,
          hostName: hostName,
          textTranslation: textTranslationRes.data,
          recommendResError: recommendResError,
          movieResError: movieResError,
          brandConfigs: brandConfigsRes.data?.data
        },
      };
    }
  }
);
