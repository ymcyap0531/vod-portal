import { Articles, Brand } from "../../types";

export interface TemplateProps {
  emailNotFound: Articles;
  emailSent: Articles;
  brand: Brand;
  onClickSubmit: () => Promise<void>;
  translatedText: any;
  errors: any;
  register: any;
  handleBlur: (e: any) => void;
  res: { exist: boolean; sent: boolean };
}
