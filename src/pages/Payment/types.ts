import { Articles, Brand } from "../../types";

export interface TemplateProps {
  trial: { days: number; amount: number };
  membership: { days: number; amount: number };
  fallback?: { days: number; amount: number };
  register: any;
  onClickSubmit: () => Promise<void>;
  errors: any;
  brand: Brand;
  translatedText: any;
  paymentTerms: string;
  transactionDisplay: string;
  subscription: string | undefined;
  paymentMonthTerms: string;
  validateCard: (e: any) => void;
  paymentErr: string;
  loader: boolean;
  paymentFields: any;
  handleBlur: (e: any) => void;
  onValueChange: (e: any) => void;
}
