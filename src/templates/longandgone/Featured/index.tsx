import React from "react";
import Link from "next/link";
import { TemplateProps } from "../../../pages/Featured/types";
import Footer from "../../../components/Footer";
import MovieCard from "../../../components/MovieCard";
import PortalNavBar from "../../../components/PortalNavBar";
import { Movie, SpecialCategory } from "../../../types";
import styles from "../styles/Styles.module.css";
import Error from "../../../pages/_error";

const EraFeaturedTemplate: React.FC<TemplateProps> = ({
  brand,
  specialCategoriesData,
  specialCategoriesResError,
}) => {
  const special_categories_names = [
    "Trending",
    "Classic Gems",
    "Too Good To Pass",
    "Weekends Fave",
    "Most Watched",
    "Editor's Pick",
  ];
  if (specialCategoriesResError) {
    return (
      <div className={` ${styles.background_color} `}>
        <Error statusCode={specialCategoriesResError} />
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <PortalNavBar styles={styles} brand={brand} />

        <section
          className={`${styles.products} products ${styles.pos_re}`}
          id=""
        >
          <div className="container">
            <br />
            <div className="movierow">
              {specialCategoriesData.data.map(
                (special_category: SpecialCategory) => {
                  return (
                    <div>
                      {special_categories_names.map(
                        (special_categories_name) => {
                          if (
                            special_category.attributes.name ===
                            special_categories_name
                          ) {
                            return (
                              <>
                                <h3 className="category-title mb-2">
                                  {special_category.attributes.name}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                  {special_category.attributes.movies.data.map(
                                    (movie) => {
                                      return (
                                        <Link
                                          href={{
                                            pathname: "/WatchMovie/",
                                            query: { id: movie.id },
                                          }}
                                          key={movie.id}
                                        >
                                          <a>
                                            <MovieCard
                                              title={movie.attributes.title}
                                              poster_url={
                                                movie.attributes.poster_url
                                              }
                                              className={styles.movietitle}
                                            />
                                          </a>
                                        </Link>
                                      );
                                    }
                                  )}
                                </div>
                              </>
                            );
                          }
                        }
                      )}
                    </div>
                  );
                }
              )}
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

export default EraFeaturedTemplate;
