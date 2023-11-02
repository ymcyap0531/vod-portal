import { Brand, Movies } from "../../types";

export interface TemplateProps {
  translatedText: any;
  brand: Brand;
  onSearchChange: (e: any) => void;
  onSearchData: () => void;
  handleEnter: (e: any) => void;
  category: string | string[] | undefined;
  handleChange: (e: any) => void;
  moviesList: Movies | undefined;
  metaPage: number;
  pageCount: number;
  page: string | string[] | undefined;
  onClick: (e: any) => void;
  catResError: any;
  movieError: any;
}
