import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TemplateProps } from "../../../components/LandingPage/types";
// import FeaturedMovieCard from "./FeaturedMovieCard";
import { Movie, SpecialCategory } from "../../../types";
import MovieCard from "../../../components/MovieCard";
import Footer from "../../../components/Footer";
import styles from "../styles/LandingPage.module.css";
import LandingPageNav from "../../../components/LandingPageNav";
import FooterIcons from "../../../components/FooterIcons";

const ClassicsLandingPageTemplate = ({
  translatedText,
  brand,
  specialCategories,
  htmlContent,
}: TemplateProps) => {
  const specialCategoriesList = ["Trending", "Classic Gems", "Most Watched"];
  return (
    <div className={`${styles.landing_page} blue`}>
      <LandingPageNav
        styles={styles}
        brand={brand}
        translatedText={translatedText}
      />

      <section
        className={`${styles.home} home ${styles.pos_re}`}
        data-overlay-light2={0}
        id="sec1"
      >
        <div className="container">
          <div className="w-full m-auto text-center mt-5">
            <h1>
              <i>
                {translatedText.rare_classic_movies} {translatedText.on_demand}
              </i>
            </h1>

            <Image
              width={850}
              height={516}
              src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/${brand.attributes.template}/home_img_skin.png`}
              alt="home img"
            />

            <Link href="/SignUpForm">
              <div className={`${styles.butn_container} hover:text-white`}>
                <a className={`${styles.butn} butn`} id="ctabtn">
                  <span>{translatedText.start_watching_now}</span>
                </a>
              </div>
            </Link>
            <h5 className="uppercase font-medium watch_cancel">
              {translatedText.watch_cancel}
            </h5>
          </div>
        </div>
      </section>

      <section className={`${styles.products} ${styles.pos_re}`} id="sec2">
        <div className="container">
          {specialCategories.data.map((special_category: SpecialCategory) => {
            if (
              special_category.attributes.name === "Featured Big Poster Image"
            ) {
              return (
                <>
                  <div className={styles.movierow}>
                    <h3 className="mb-2">{special_category.attributes.name}</h3>
                    <span className={styles.seeall}>
                      <Link href="/SignUpForm">{translatedText.see_all}</Link>
                    </span>
                    <br />
                    <div className="md:flex p-5 rounded-2xl bg-gradient-to-t from-red-900/[0.4] to-blue-500/[0.4] mx-auto left-0 right-0">
                      <div className="text-center md:w-8/12">
                        <Image
                          width={700}
                          height={809}
                          src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/featured_img.png`}
                          className="watchdevice"
                          alt="featured_image"
                        />
                      </div>
                      <div className="md:w-4/12">
                        <br />
                        <br />
                        {special_category.attributes.movies.data.map(
                          (movie) => {
                            return (
                              <>
                                <h2 className="capitalize">
                                  {movie.attributes.title}
                                </h2>
                                <h4>({movie.attributes.year})</h4>
                                <div className={`block ${styles.fivestars}`}>
                                  ★★★★★
                                </div>
                                <br />
                                <h6>
                                  {translatedText.starring}:
                                  <br />
                                  {movie.attributes.starring}
                                </h6>
                                <br />
                                <h6>
                                  {translatedText.directed_by}:
                                  {movie.attributes.director}
                                </h6>
                                <h6>
                                  {translatedText.duration}:
                                  {movie.attributes.duration}
                                </h6>
                                <br />
                                {movie.attributes.description}
                                <br />
                                <br />
                              </>
                            );
                          }
                        )}
                        <div className="butn-container mt-2">
                          <Link href="SignUpForm">
                            <a className={`${styles.butn} butn`} id="">
                              <span className="text-2xl font-bold">
                                {translatedText.start_watching_now}
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                </>
              );
            }
          })}

          {specialCategories.data.map((special_category: SpecialCategory) => {
            return (
              <div>
                {specialCategoriesList.map((specialCategoryName) => {
                  if (
                    special_category.attributes.name === specialCategoryName
                  ) {
                    return (
                      <>
                        <div className={styles.movierow}>
                          <h3 className="mb-2">
                            {special_category.attributes.name}
                          </h3>
                          <span className={styles.seeall}>
                            <Link href="/SignUpForm">
                              {translatedText.see_all}
                            </Link>
                          </span>
                          <br />
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {special_category.attributes.movies.data.map(
                              (movie) => {
                                return (
                                  <Link href="/SignUpForm" key={movie.id}>
                                    <a>
                                      <MovieCard
                                        title={movie.attributes.title}
                                        poster_url={movie.attributes.poster_url}
                                        className={styles.movietitle}
                                      />
                                    </a>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                          <br />
                          <br />
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </section>

      <section
        className={`about ${styles.pos_re}`}
        data-overlay-dark2={0}
        id="sec3"
      >
        <div className="container">
          <div className="">
            <div className="text-center">
              <Image
                width={1000}
                height={563}
                src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/${brand.attributes.template}/multidevice.png`}
                className="watchdevice"
                alt="watch device2"
              />
            </div>
            <div className="text-center p-10 border-2 border-[#0064BB] rounded-2xl bg-[#0064BB]/[0.1] max-w-[800px] mx-auto left-0 right-0">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
              <br />
              <div className={`${styles.butn_container} mt-2`}>
                <Link href="SignUpForm">
                  <a className={`${styles.butn} butn`} id="">
                    <span className="text-2xl font-bold">
                      {translatedText.start_watching_now}
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.copyright} ${styles.pos_re}`} id="sec4">
        <div className="container">
          <Footer brand={brand} />
          <FooterIcons />
        </div>
      </section>
    </div>
  );
};

export default ClassicsLandingPageTemplate;
