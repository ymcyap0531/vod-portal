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
  const specialCategoriesList = ["Romance", "Horror"];
  return (
    <div className={styles.landing_page}>
      <LandingPageNav
        styles={styles}
        brand={brand}
        translatedText={translatedText}
      />

      <section
        className={`${styles.home} home ${styles.pos_re}`}
        data-overlay-dark={2}
        id="sec1"
      >
        <div className="container">
          <div className="flex ">
            
            <div className={`${styles.slogancontainer} slogan-container flex-[1_0_0%] sm:pt-0 md:pt-[8vh]`}>
            
              <div className="slogan">
                {/* <div className={`${styles.sloganimg} sloganimg slogan-img`}>
                  <Image
                    width={350}
                    height={245}
                    // src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/${brand.attributes.template}/home_img_skin.png`}
                    src="/longandgone/img/home_img_skin.png"
                    alt="home_img_skin"
                  />
                </div> */}
                <h1>
                  {translatedText.rare_classic_movies}
                  <br />
                  {translatedText.on_demand}
                </h1>
                {/* <br />
                <h2>★★★★★</h2> */}
                
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
            {/* <div className={`${styles.home_img} home_img sm:flex-[none] md:flex-[1_0_0%] `}>
              <Image
                height={949}
                width={600}
                src="/longandgone/img/home_img_skin.png"
                alt="home_img"
              />
            </div> */}
          </div>
        </div>
      </section>

      <section
        className={`${styles.products} products ${styles.pos_re}`}
        data-overlay-dark={0}
        id="sec2"
      >
        <div className="container">
          <div className={`${styles.movierow} movierow`}>
            {specialCategories.data.map((special_category: SpecialCategory) => {
              if (special_category.attributes.name === "Wild West") {
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
        className={`${styles.about} about ${styles.pos_re}`}
        data-overlay-dark={0}
        id="sec3"
      >
        <div className="container">
          <div className="text-center">
              <Image
                width={1000}
                height={700}
                src="/longandgone/img/multidevice6.png"
                alt="multidevice6"
              />
          </div>
          <div className="text-center p-10 border-2 border-[#111111] rounded-lg bg-[#000000]/[0.8] max-w-[850px] mx-auto left-0 right-0">
            
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
