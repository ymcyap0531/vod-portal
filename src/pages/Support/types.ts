import { Brand, Faqs } from "../../types";

export interface TemplateProps {
  content: string;
  faqList: Faqs;
  translatedText: any;
  setUserEmail: any;
  brand: Brand;
}
