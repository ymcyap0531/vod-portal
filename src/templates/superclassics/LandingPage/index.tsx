import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TemplateProps } from "../../../components/LandingPage/types";
import FeaturedMovieCard from "./FeaturedMovieCard";
import { Movie, SpecialCategory } from "../../../types";
import MovieCard from "../../../components/MovieCard";
import Footer from "../../../components/Footer";
import styles from "../styles/LandingPage.module.css";
import LandingPageNav from "../../../components/LandingPageNav";
import FooterIcons from "../../../components/FooterIcons";

const EraLandingPageTemplate = ({
  translatedText,
  brand,
  specialCategories,
  htmlContent,
}: TemplateProps) => {
  const specialCategoriesList = ["Superclassics Popular", "Superclassics Fave"];
  return (
    <div className={styles.landing_page}>
      <LandingPageNav
        styles={styles}
        brand={brand}
        translatedText={translatedText}
      />

      <section
        className={`${styles.home} home ${styles.pos_re}`}
        data-overlay-dark={6}
        id="sec1"
      >
        <div className="container">
          <div className="flex ">
            
            <div className="slogan-container flex-[1_0_0%]">
              <div className="slogan">
                <div className="slogan-img">
                  <Image
                    height={345}
                    width={470}
                    src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/${brand.attributes.template}/home_img_skin.png`}
                    alt="home_img_skin"
                  />
                </div>
                <br />
                <h1>
                  {translatedText.rare_classic_movies}
                  <br />
                  {translatedText.on_demand}
                </h1>
                <br />
                <h2>★★★★★</h2>
                
                <br />
                <Link href="/SignUpForm">
                  <div className={`${styles.butn_container} hover:text-white`}>
                    <a className={styles.butn} id="ctabtn">
                      <span>{translatedText.start_watching_now}</span>
                    </a>
                  </div>
                </Link>
                <br />
                <h3 className="font-medium">{translatedText.watch_cancel}</h3>
              </div>
            </div>
            {/* <div className={`${styles.home_img} home_img flex-[1_0_0%] `}>
              <Image
                height={949}
                width={600}
                src="/superclassics/img/home_img3.png"
                alt="home_img"
              />
            </div> */}
          </div>
        </div>
      </section>

      <section
        className={`${styles.products} products ${styles.pos_re}`}
        data-overlay-light3={9}
        id="sec2"
      >
        <div className="container">
          <div className={`${styles.movierow} movierow`}>
            {specialCategories.data.map((special_category: SpecialCategory) => {
              if (special_category.attributes.name === "Superclassics Most Watched") {
                return (
                  <>
                    <h3 className="mb-2">{special_category.attributes.name}</h3>
                    <br></br>
                    <span className={styles.seeall}>
                      <Link href="/SignUpForm">{translatedText.see_all}</Link>
                    </span>
                    <br />
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {special_category.attributes.movies.data.map((movie) => {
                        return (
                          <Link href="/SignUpForm" key={movie.id}>
                            <a>
                              {/* <FeaturedMovieCard */}
                              <MovieCard
                                title={movie.attributes.title}
                                poster_url={movie.attributes.poster_url}
                                className={styles.movietitle}
                              />
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                );
              }
            })}
            <br />
            <br />
            {specialCategories.data.map((special_category: SpecialCategory) => {
              return (
                <div>
                  {specialCategoriesList.map((specialCategoryName) => {
                    if (
                      special_category.attributes.name === specialCategoryName
                    ) {
                      return (
                        <>
                          <h3 className="mb-2">
                            {special_category.attributes.name}
                          </h3>
                          <br></br>
                          <span className={styles.seeall}>
                            <Link href="/SignUpForm">
                              {translatedText.see_all}
                            </Link>
                          </span>
                          <br />
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                        </>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={`about ${styles.pos_re}`}
        data-overlay-dark3={0}
        id="sec3"
      >
        <div className="container text-black">
          <div className="sm:flex">
            
            <div className="sm:w-6/12 order-md-last">
              <Image
                height={800}
                width={622}
                src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/${brand.attributes.template}/multidevice.png`}
                className="watchdevice"
                alt="watchdevice"
              />
            </div>
            {/* <div className="sm:w-6/12 order-md-first"> */}
            <div className={`${styles.multidevice_header} sm:w-6/12 order-md-first `}>
              <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
              <br />
              <div className={`${styles.butn_container} mt-2`}>
                <Link href="SignUpForm">
                  <a className={styles.butn} id="">
                    <span>{translatedText.start_watching_now}</span>
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

export default EraLandingPageTemplate;
