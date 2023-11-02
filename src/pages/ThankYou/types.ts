import { Brand } from "../../types";

export interface TemplateProps {
  content: string;
  translatedText: any;
  handleClick: () => void;
  brand: Brand;
  transactionDisplay: string;
  loader: boolean;
}
