import React from "react";
import Image from "next/image";
import Link from "next/link";

import PortalNavBar from "../../../components/PortalNavBar";
import styles from "../styles/Styles.module.css";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/Genres/types";

const EraGenresTemplate = ({ brand, categories }: TemplateProps) => {
  return (
    <div className={styles.main}>
      <PortalNavBar styles={styles} brand={brand} />

      <section
        className={`${styles.products} products ${styles.pos_re} pos_re genres`}
        id=""
      >
        <div className="container">
          <div className="flex justify-center items-center">
            <h1>Genres</h1>
            {/* <Image
              height={204}
              width={150}
              src="/images/genres_img.png"
              className="genres_img"
              alt="generes image"
            /> */}
          </div>
          <h4 className="text-2xl">Choose your favorite genre:</h4>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
            <div>
              <Link href={`/Genres/Action`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_action.png"
                    layout="responsive"
                    alt="genere action"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Action</span>
                </div>
              </Link>
              <Link href={`/Genres/Comedy`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_comedy.png"
                    layout="responsive"
                    alt="genere comedy"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Comedy</span>
                </div>
              </Link>
              <Link href={`/Genres/Adventure`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_adventure.png"
                    layout="responsive"
                    alt="genere adventure"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Adventure</span>
                </div>
              </Link>
              <Link href={`/Genres/Drama`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_drama.png"
                    layout="responsive"
                    alt="genere drama"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Drama</span>
                </div>
              </Link>
              <Link href={`/Genres/Thriller`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_thriller.png"
                    layout="responsive"
                    alt="genere thriller"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Thriller</span>
                </div>
              </Link>
              <Link href={`/Genres/Sci-Fi`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_scifi.png"
                    layout="responsive"
                    alt="genere sci-fi"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Sci-Fi</span>
                </div>
              </Link>
              <Link href={`/Genres/Musical`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_musical.png"
                    layout="responsive"
                    alt="genere musical"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Musical</span>
                </div>
              </Link>
              <Link href={`/Genres/Family`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_family.png"
                    layout="responsive"
                    alt="genere family"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Family</span>
                </div>
              </Link>
              <Link href={`/Genres/Film Noir`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_filmnoir.png"
                    layout="responsive"
                    alt="genere film noir"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Film Noir</span>
                </div>
              </Link>
              <Link href={`/Genres/Animation`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_animation.png"
                    layout="responsive"
                    alt="genere animation"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Animation</span>
                </div>
              </Link>
              <Link href={`/Genres/Documentary`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_documentary.png"
                    layout="responsive"
                    alt="genere documentary"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Documentary</span>
                </div>
              </Link>
              <Link href={`/Genres/Sport`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_sport.png"
                    layout="responsive"
                    alt="genere sport"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Sport</span>
                </div>
              </Link>
            </div>

            <div>
              <Link href={`/Genres/Romance`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_romance.png"
                    layout="responsive"
                    alt="genere romance"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Romance</span>
                </div>
              </Link>
              <Link href={`/Genres/Horror`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_horror.png"
                    layout="responsive"
                    alt="genere horror"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Horror</span>
                </div>
              </Link>
              <Link href={`/Genres/Western`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_western.png"
                    layout="responsive"
                    alt="genere western"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Western</span>
                </div>
              </Link>
              <Link href={`/Genres/Crime`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_crime.png"
                    layout="responsive"
                    alt="genere crime"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Crime</span>
                </div>
              </Link>
              <Link href={`/Genres/Mystery`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_mystery.png"
                    layout="responsive"
                    alt="genere mystery"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Mystery</span>
                </div>
              </Link>
              <Link href={`/Genres/War`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_war.png"
                    layout="responsive"
                    alt="genere war"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>War</span>
                </div>
              </Link>
              <Link href={`/Genres/Music`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_music.png"
                    layout="responsive"
                    alt="genere music"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Music</span>
                </div>
              </Link>
              <Link href={`/Genres/Fantasy`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_fantasy.png"
                    layout="responsive"
                    alt="genere fantasy"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Fantasy</span>
                </div>
              </Link>
              <Link href={`/Genres/History`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_history.png"
                    layout="responsive"
                    alt="genere history"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>History</span>
                </div>
              </Link>
              <Link href={`/Genres/Biography`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_biography.png"
                    layout="responsive"
                    alt="genere biography"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Biography</span>
                </div>
              </Link>
              <Link href={`/Genres/Short`}>
                <div className={`${styles.genre_feature_img} genre_feature_img cursor-pointer`}>
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_short.png"
                    layout="responsive"
                    alt="genere short"
                  />
                  <span className={`${styles.genretextinbox} genretextinbox cursor-pointer`}>Short</span>
                </div>
              </Link>
            </div>
          </div>
          <br />
          {/* <div className={`${styles.genrescategory} genrescategory grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5`}>
            {categories.map((category) => {
              return (
                <Link href={`/Genres/${category}`} key={category}>
                  <a className="genres-category">{category}</a>
                </Link>
              );
            })}
          </div> */}
        </div>
      </section>
      <section className={`${styles.copyright} ${styles.pos_re}`} id="">
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default EraGenresTemplate;
