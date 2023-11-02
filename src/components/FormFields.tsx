import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export const SignInFields = ({
  register,
  setEmail,
  translatedText,
  email,
  errors,
  isShow,
  setPassword,
  password,
  handleIcon,
}: any) => {
  return (
    <>
      <div className="inputfield-container">
        <input
          type="text"
          {...register("email", {
            required: true,
            maxLength: 50,
          })}
          className="inputfield"
          placeholder={translatedText.placeholder_email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          value={email}
          id="email"
          name="email"
        />
        {errors.email && email.length === 0 && (
          <span className="errortext">{translatedText.email_required}</span>
        )}
      </div>
      <br />
      <div className="inputfield-container">
        <input
          type={isShow ? "text" : "password"}
          {...register("password", {
            required: true,
            maxLength: 50,
          })}
          className="inputfield"
          placeholder={translatedText.placeholder_password}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          name="password"
        />
        <FontAwesomeIcon
          icon={isShow ? faEye : faEyeSlash}
          className="-ml-10 text-black cursor-pointer"
          onClick={handleIcon}
        />
        {errors.password && password.length === 0 && (
          <span className="errortext">{translatedText.password_required}</span>
        )}
      </div>
      <br />
    </>
  );
};

export const SignInMobileFields = ({
  register,
  translatedText,
  errors,
  setMobile,
  mobile,
  setEmail,
  clearErrors,
  showPinCodeInput,
  phoneInfo
}: any) => {
  const handleMobileChange = (e: any) => {
    const value = e.target.value;
    const emailVal = value.length === phoneInfo?.phoneLength ? `${phoneInfo?.phonePrefix}${value}` : value;
    setMobile(value);
    setEmail(`${emailVal}@alltimeflix.com`)
    clearErrors("mobile");
    clearErrors("email");
  }

  return (
    <>
      {!showPinCodeInput && (
        <>
        <div className="inputfield-container">
          <input
            type="text"
            {...register("mobile", {
              required: true,
              pattern: {
                value: phoneInfo?.phoneRegex,
                message: "Invalid mobile number format.",
              },
            })}
            className="inputfield"
            placeholder={translatedText.placeholder_mobile}
            onChange={handleMobileChange}
            value={mobile}
            id="mobile"
            name="mobile"
          />
          {errors.mobile && mobile.length === 0 && (
            <span className="errortext">{translatedText.mobile_required}</span>
          )}
        </div>
        <br />
        </>
      )}

      {showPinCodeInput && (
        <>
        <div className="inputfield-container">
          <input
            type="text"
            {...register("pincode", {})}
            className="inputfield"
            placeholder="Enter PIN code"
            id="pincode"
            name="pincode"
          />
          {errors.pincode && (
            <span className="errortext">{errors.pincode.message}</span>
          )}
        </div>
        <br />
        </>
      )}
    </>
  );
};

const FormFields = () => {
  return <div>FormFields</div>;
};

export default FormFields;
