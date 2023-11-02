import { Articles, Brand } from "../../types";

export interface TemplateProps {
  email: string | undefined;
  supportEmail: string;
  brand: Brand;
  translatedText: any;
  alreadyCancel: Articles;
  cancelSuccess: Articles;
  notFound: Articles;
}
