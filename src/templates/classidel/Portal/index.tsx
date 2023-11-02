import React from "react";
import Link from "next/link";

import Category from "../../../components/Category";
import MovieCard from "../../../components/MovieCard";
import PortalNavBar from "../../../components/PortalNavBar";
import Search from "../../../components/Search";
import { TemplateProps } from "../../../pages/Portal/types";
import Footer from "../../../components/Footer";
import styles from "../styles/Styles.module.css";
import portalstyles from "../styles/Portal.module.css";
import Error from "../../../pages/_error";

const EraPortalTemplate = ({
  translatedText,
  brand,
  onSearchChange,
  onSearchData,
  handleEnter,
  category,
  handleChange,
  moviesList,
  metaPage,
  pageCount,
  page,
  onClick,
  catResError,
  movieError,
}: TemplateProps) => {

  if (catResError || movieError) {
    if (category) {
      return (
        <div className={` ${styles.background_color} `}>
          <Error statusCode={catResError} />
        </div>
      );
    } else {
      return (
        <div className={`${styles.background_color} h-screen`}>
          <Error statusCode={movieError} />
        </div>
      );
    }
  } else {
    return (
      <div className={styles.main}>
        <PortalNavBar styles={styles} brand={brand} />
        <section
          className={`${styles.products} products ${styles.pos_re} pos-re`}
          id=""
        >
          <div className="container">
            <Search
              onSearchChange={onSearchChange}
              onSearchData={onSearchData}
              handleEnter={handleEnter}
              styles={portalstyles}
            />
            <br />
            <div className="movierow">
              <h3 className="category-title mb-2">
                {category ? category : "All Movies"}
              </h3>
              <Category
                handleChange={handleChange}
                catParam={category?.toString()}
                styles={portalstyles}
              />

              <br />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {moviesList?.data.map((movie) => {
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
            </div>
          </div>
          <div className="justify-center flex container">
            <div className="grid grid-cols-5 gap-1 sm:gap-4 ">
              <Link
                href={
                  category
                    ? `Portal/?category=${category}&page=${metaPage - 1}`
                    : `Portal/?page=${metaPage - 1}`
                }
              >
                <button
                  disabled={metaPage <= 1}
                  className={`${portalstyles.pagination} pagination border-2 rounded sm:p-0.5`}
                >
                  {translatedText.previous}
                </button>
              </Link>
              <button
                className={`${portalstyles.pagination_active} pagination_active ${
                  metaPage === 1
                    ? page === metaPage.toString()
                      ? "pagination"
                      : ""
                    : page === (metaPage - 1).toString()
                    ? "pagination"
                    : ""
                }`}
                onClick={onClick}
                name="page"
              >
                {metaPage === 1 ? metaPage : metaPage - 1}
              </button>
              <button
                className={`${portalstyles.pagination_active} pagination_active ${
                  metaPage === 1
                    ? page === (metaPage + 1).toString()
                      ? "pagination"
                      : ""
                    : page === metaPage.toString()
                    ? "pagination"
                    : ""
                }`}
                disabled={
                  metaPage === 1
                    ? metaPage + 1 > pageCount
                    : metaPage > pageCount
                }
                onClick={onClick}
                name="page"
              >
                {metaPage === 1 ? metaPage + 1 : metaPage}
              </button>
              <button
                className={`${portalstyles.pagination_active} pagination_active ${
                  metaPage === 1
                    ? page === (metaPage + 2).toString()
                      ? "pagination"
                      : ""
                    : page === (metaPage + 1).toString()
                    ? "pagination"
                    : ""
                }`}
                disabled={
                  metaPage === 1
                    ? metaPage + 2 > pageCount
                    : metaPage + 1 > pageCount
                }
                name="page"
                onClick={onClick}
              >
                {metaPage === 1 ? metaPage + 2 : metaPage + 1}
              </button>
              <Link
                href={
                  category
                    ? `Portal/?category=${category}&page=${metaPage + 1}`
                    : `Portal/?page=${metaPage + 1}`
                }
              >
                <button
                  disabled={metaPage >= pageCount}
                  className={`${portalstyles.pagination} pagination border-2 rounded sm:p-0.5`}
                >
                  {translatedText.next}
                </button>
              </Link>
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

export default EraPortalTemplate;
