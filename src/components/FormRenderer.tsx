import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export const FormRenderer = ({
  errors,
  handleBlur,
  isEmailExist,
  type,
  isShow,
  fieldName,
  minLength,
  maxLength,
  placeholder,
  translatedText,
  onValueChange,
  values,
  handleIcon,
  isShowPwdConf,
  setIsShowPwdConf,
}: any) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  fieldName === "password"
    ? isShow
      ? (type = "text")
      : (type = "password")
    : fieldName === "passwordConfirmation"
    ? isShowPwdConf
      ? (type = "text")
      : (type = "password")
    : type;
  return (
    <div className="">
      <input
        className="inputfield"
        minLength={parseInt(minLength)}
        maxLength={parseInt(maxLength)}
        onBlur={handleBlur}
        placeholder={placeholder}
        type={type}
        name={fieldName}
        value={values ? values[fieldName] : null}
        onChange={onValueChange}
        readOnly={isReadOnly}
        onFocus={() => setIsReadOnly(false)}
      />
      {fieldName === "password" && (
        <FontAwesomeIcon
          icon={isShow ? faEye : faEyeSlash}
          className="-ml-10 text-black cursor-pointer relative"
          onClick={handleIcon}
        />
      )}
      {fieldName === "passwordConfirmation" && (
        <FontAwesomeIcon
          icon={isShowPwdConf ? faEye : faEyeSlash}
          className="-ml-10 text-black cursor-pointer relative"
          onClick={() => setIsShowPwdConf(!isShowPwdConf)}
        />
      )}
      {errors[fieldName] && (
        <span className="errortext">
          {isEmailExist && fieldName === "email_address"
            ? translatedText.email_exists
            : `${translatedText[`error_${fieldName}`]}`}
        </span>
      )}
    </div>
  );
};
