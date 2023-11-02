import { Brand } from "../../types";

export interface TemplateProps {
  subscription: string;
  handleClick: (e: any) => void;
  trial: { days: number; amount: number };
  membership: { days: number; amount: number };
  fallback?: { days: number; amount: number };
  translatedText: any;
  register: any;
  onClickSubmit: () => Promise<void>;
  errors: any;
  handleBlur: any;
  brand: Brand;
  isShow: boolean;
  handleIcon: () => void;
  subClick: boolean;
  initPaymentErr: string;
  isEmailExist: boolean;
  loader: boolean;
  signUpFormFields: any;
  onValueChange: (e: any) => void;
  values: any;
  brandConfDetails?: any;
}
