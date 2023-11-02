import { Brand, Categories, Movie, Movies } from "../../types";

export interface TemplateProps {
  translatedText: any;
  brand: Brand;
  movie: Movie;
  categories: Categories;
  recommendCategory: Movies;
  recommendResError: any;
  movieResError: any;
}
