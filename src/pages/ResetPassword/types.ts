import { Brand } from "../../types";

export interface TemplateProps {
  translatedText: any;
  register: any;
  onClickSubmit: () => Promise<void>;
  errors: any;
  brand: Brand;
  isShowPwd: boolean;
  pwd: { password: string; passwordConfirmation: string };
  handleChange: (e: any) => void;
  // setIsShowPwd: React.Dispatch<React.SetStateAction<boolean>>;
  isShowPwdConf: boolean;
  handleIcon: (e: any) => void;
  setIsShowPwdConf: React.Dispatch<React.SetStateAction<boolean>>;
  isMatch: boolean;
  resetPwdFields: any;
  handleBlur: (e: any) => void;
}
