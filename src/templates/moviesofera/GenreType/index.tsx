import React from "react";
import Link from "next/link";
import MovieCard from "../../../components/MovieCard";
import { GenreTypeTemplateProps } from "../../../pages/Genres/genretypes";
import { Movie } from "../../../types";
import styles from "../styles/Styles.module.css";
import genreTypestyles from "../styles/GenreType.module.css";
import Error from "../../../pages/_error";

const EraGenereTypeTemplates = ({
  moviesList,
  category,
  movieResError,
}: GenreTypeTemplateProps) => {
  if (movieResError) {
    return (
      <div className={`${styles.background_color} h-screen`}>
        <Error statusCode={movieResError} />
      </div>
    );
  } else {
    return (
      <div className={styles.moviesofera}>
        <nav className={styles.navbar}>
          <div
            className={`flex justify-between container ${genreTypestyles.genre} mt-2 mx-auto`}
          >
            <h3 className="category-title mb-2">{category}</h3>
            <Link href="/Genres">
              <a className="border-[#e50916] border-2 mb-2 rounded-md p-2">
                Back to Genres
              </a>
            </Link>
          </div>
        </nav>
        <div className="container products">
          {moviesList?.data?.length !== 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {moviesList?.data?.map((movie: Movie) => {
                return (
                  <Link
                    key={movie.id}
                    href={{
                      pathname: "/WatchMovie/",
                      query: { id: movie.id },
                    }}
                  >
                    <a>
                      <MovieCard
                        title={movie?.attributes.title}
                        poster_url={movie.attributes.poster_url}
                        className={styles.movietitle}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="container genres block">
              <h4 className="text-2xl">Sorry! cannot find Genre {category}</h4>
              <Link href="/Genres">
                <a className="border-[#e50916] border-2 mb-2 rounded-md p-2">
                  Go Back
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default EraGenereTypeTemplates;
