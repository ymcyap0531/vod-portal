import { Brand } from "../../types";

export interface TemplateProps {
  brand: Brand;
  onClickSubmit: () => Promise<void>;
  translatedText: any;
  errors: any;
  register: any;
  isShowPwd: boolean;
  setIsShowPwd: React.Dispatch<React.SetStateAction<boolean>>;
  isShowPwdConf: boolean;
  setIsShowPwdConf: React.Dispatch<React.SetStateAction<boolean>>;
  errMsg: boolean;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  changePwdFields: any;
  handleIcon: (e: any) => void;
  CPApiError: any;
}
