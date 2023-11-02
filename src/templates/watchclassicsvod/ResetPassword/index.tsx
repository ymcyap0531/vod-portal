import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { TemplateProps } from "../../../pages/ResetPassword/types";
import Footer from "../../../components/Footer";
import resetPasswordstyles from "../styles/ResetPassword.module.css";
import styles from "../styles/Styles.module.css";
import LeftImage from "../../../components/LeftImage";
import { FormRenderer } from "../../../components/FormRenderer";
import PwdPageNav from "../../../components/PwdPageNav";

const ClassicsResetPasswordTemplate = ({
  translatedText,
  register,
  onClickSubmit,
  errors,
  brand,
  isShowPwd,
  pwd,
  handleChange,
  resetPwdFields,
  handleBlur,
  handleIcon,
  isShowPwdConf,
  setIsShowPwdConf,
  isMatch,
}: TemplateProps) => {
  return (
    <div className={styles.watch_classics_vod}>
      <PwdPageNav
        styles={styles}
        brand={brand}
        translatedText={translatedText}
      />

      <section
        className={`${styles.home} home signin ${resetPasswordstyles.pos_re}`}
        data-overlay-dark2={8}
        id=""
      >
        <div className="container">
          <div className="flex">
            <LeftImage image={"home_img2"} width={600} height={949} />
            <div className="flex-[1_0_0%]">
              <h2>{translatedText.reset_your_password}</h2>
              {/* <h4>user name: </h4> */}
              <br />
              <form className="form" id="contact-form">
                {resetPwdFields.map((field: any, index: any) => {
                  return (
                    <>
                      <FormRenderer
                        translatedText={translatedText}
                        errors={errors}
                        handleBlur={handleBlur}
                        isShow={isShowPwd}
                        pwd={pwd}
                        handleIcon={handleIcon}
                        isShowPwdConf={isShowPwdConf}
                        setIsShowPwdConf={setIsShowPwdConf}
                        type={
                          field.fieldRule.type ? field.fieldRule.type : "text"
                        }
                        fieldName={field.fieldName}
                        minLength={
                          field.fieldRule.minLength
                            ? field.fieldRule.minLength
                            : ""
                        }
                        maxLength={
                          field.fieldRule.maxLength
                            ? field.fieldRule.maxLength
                            : ""
                        }
                        placeholder={
                          translatedText[`placeholder_${field.fieldName}`]
                        }
                        onValueChange={handleChange}
                      />
                      <br />
                    </>
                  );
                })}
                {!isMatch && (
                  <span className="errortext">
                    {translatedText.passwords_do_not_match}
                  </span>
                )}
                <div className="inputfield-container" onClick={onClickSubmit}>
                  <div className="butn-container">
                    <a className={`${styles.butn} butn`} id="submit-signup">
                      <span>{translatedText.reset}</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${styles.copyright} ${resetPasswordstyles.pos_re}`}
        id="sec4"
      >
        <Footer brand={brand} />
      </section>
    </div>
  );
};

export default ClassicsResetPasswordTemplate;
