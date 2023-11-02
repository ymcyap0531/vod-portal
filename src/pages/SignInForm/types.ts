import { Brand } from "../../types";

export interface TemplateProps {
  translatedText: any;
  register: any;
  onClickSubmit: () => Promise<void>;
  errors: any;
  brand: Brand;
  isShow?: boolean;
  handleIcon?: () => void;
  setEmail: (value: string) => void;
  email: string;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  password?: string;
  setMobile?: React.Dispatch<React.SetStateAction<string>>;
  mobile?: string;
  setPincode?: React.Dispatch<React.SetStateAction<string>>;
  pincode?: string;
  errMsg: boolean;
  clearErrors?: any;
  showPinCodeInput?: boolean;
  phoneInfo?: any;
  isLoading?: boolean;
}
