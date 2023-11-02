import React from "react";
import Image from "next/image";
import Link from "next/link";

import PortalNavBar from "../../../components/PortalNavBar";
import styles from "../styles/Styles.module.css";
import Footer from "../../../components/Footer";
import { TemplateProps } from "../../../pages/Genres/types";

const EraGenresTemplate = ({ brand, categories }: TemplateProps) => {
  return (
    <div className={styles.moviesofera}>
      <PortalNavBar styles={styles} brand={brand} />

      <section className="products genres pos-re" id="">
        <div className="container">
          <div className="flex justify-center items-center">
            <h1>Genres</h1>
            <Image
              height={204}
              width={150}
              src="/images/genres_img.png"
              className="genres_img"
              alt="generes image"
            />
          </div>
          <h4 className="text-2xl">Choose your favorite genre:</h4>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
            <div>
              <Link href={`/Genres/Action`}>
                <div className="genre_feature_img cursor-pointer">
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_action.png"
                    layout="responsive"
                    alt="genere action"
                  />
                </div>
              </Link>
              <Link href={`/Genres/Comedy`}>
                <div className="genre_feature_img cursor-pointer">
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_comedy.png"
                    layout="responsive"
                    alt="genere comedy"
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link href={`/Genres/Romance`}>
                <div className="genre_feature_img cursor-pointer">
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_romance.png"
                    layout="responsive"
                    alt="genere romance"
                  />
                </div>
              </Link>
              <Link href={`/Genres/Horror`}>
                <div className="genre_feature_img cursor-pointer">
                  <Image
                    height={120}
                    width={580}
                    src="/images/genre/genre_horror.png"
                    layout="responsive"
                    alt="genere horror"
                  />
                </div>
              </Link>
            </div>
          </div>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {categories.map((category) => {
              return (
                <Link href={`/Genres/${category}`} key={category}>
                  <a className="genres-category">{category}</a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className={`${styles.copyright} ${styles.pos_re}`} id="sec4">
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default EraGenresTemplate;
