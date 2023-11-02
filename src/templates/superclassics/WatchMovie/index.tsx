import React from "react";
import Link from "next/link";

import Footer from "../../../components/Footer";
import PortalNavBar from "../../../components/PortalNavBar";
import MovieCard from "../../../components/MovieCard";
import { TemplateProps } from "../../../pages/WatchMovie/types";
import styles from "../styles/Styles.module.css";
import watchMoviestyles from "../styles/WatchMovie.module.css";
import ReactPlayer from "react-player";
import Error from "../../../pages/_error";

const EraWatchMovieTemplate = ({
  translatedText,
  brand,
  movie,
  categories,
  recommendCategory,
  recommendResError,
  movieResError,
}: TemplateProps) => {
  if (recommendResError || movieResError) {
    return (
      <div className={`${styles.background_color} h-screen`}>
        <Error statusCode={movieResError} />
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <PortalNavBar styles={styles} brand={brand} />
        <section
          className={`${styles.products} products ${styles.pos_re} pt-[100px]`}
          data-overlay-light3={9}
          id=""
        >
          <div className="container">
            <div className="movie-details-title">
              <h3>{movie?.attributes.title}</h3>
            </div>
            <div className="video-wrap relative pt-[56.25%]">
              <ReactPlayer
                url={`${process.env.NEXT_PUBLIC_CONTENT_MOVIE_URL}${movie?.attributes.movie_url}`}
                config={{
                  file: {
                    attributes: {
                      poster: `https://cdn.classico-vod.com/poster-image-files/${movie?.attributes.poster_url}`,
                      controlsList: "nodownload",
                      onSeeked: (e: any) => console.log(e.target.currentTime),
                    },
                  },
                }}
                onContextMenu={(e: any) => e.preventDefault()}
                controls={true}
                autoplayer
                height="100%"
                width="100%"
                className="absolute top-0 left-0"
                onSeek={() => {
                  console.log("seek");
                }}
              />
            </div>
            <div className={`${styles.moviedetailscontent} movie-details-content`}>
              <div className={`${styles.moviedetailsinfo} movie-details-info`}>
                <ul>
                  <li>
                    <span>{translatedText.director}: </span>
                    {movie?.attributes.director}
                  </li>
                  <li>
                    <span>{translatedText.starring}: </span>
                    {movie?.attributes.starring}
                  </li>
                  <li>
                    <span>{translatedText.category}:</span>
                    {categories?.data.map(
                      (category, index) =>
                        `${category.attributes.name}${
                          categories?.data.length - 1 === index ? "" : ", "
                        } `
                    )}
                  </li>
                  <li>
                    <span>{translatedText.duration}: </span>
                    {movie?.attributes.duration}
                  </li>
                  <li>
                    <span>{translatedText.year}: </span>
                    {movie?.attributes.year}
                  </li>
                  <li>
                    <span>{translatedText.imdb}: </span>
                    <a
                      href={movie?.attributes.imdb_url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:underline"
                    >
                      {movie?.attributes.imdb_url}
                    </a>
                  </li>
                </ul>
              </div>
              <p>{movie?.attributes.description}</p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.products} products ${styles.pos_re}`}
          id=""
        >
          <div className="container">
            <div className="movierow">
              <h3>{translatedText.recommended_for_you}</h3>
              <br />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
                {recommendCategory?.data.map((movie) => (
                  <Link
                    href={{
                      pathname: "/WatchMovie/",
                      query: { id: movie.id },
                    }}
                    key={movie.id}
                  >
                    <a>
                      <MovieCard
                        title={movie?.attributes.title}
                        poster_url={movie.attributes.poster_url}
                        className={styles.movietitle}
                      />
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.copyright} ${styles.pos_re}`} id="">
          <Footer brand={brand} />
        </section>
      </div>
    );
  }
};

export default EraWatchMovieTemplate;
