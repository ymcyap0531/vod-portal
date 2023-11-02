import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { TemplateProps } from "../../../pages/ChangePassword/types";
import Footer from "../../../components/Footer";
import LeftImage from "../../../components/LeftImage";
import { FormRenderer } from "../../../components/FormRenderer";
import PwdPageNav from "../../../components/PwdPageNav";
import styles from "../styles/Styles.module.css";
import cPStyles from "../styles/ChangePassword.module.css";
import Error from "../../../pages/_error";

const EraChangePasswordTemplate: React.FC<TemplateProps> = ({
  translatedText,
  brand,
  onClickSubmit,
  errors,
  isShowPwd,
  isShowPwdConf,
  setIsShowPwdConf,
  errMsg,
  changePwdFields,
  handleIcon,
  handleChange,
  handleBlur,
  CPApiError,
}) => {
  if (CPApiError) {
    return (
      <div className={` ${styles.background_color} `}>
        <Error statusCode={CPApiError} />
      </div>
    );
  } else {
    return (
      <div className={styles.change_password}>
        <PwdPageNav
          styles={styles}
          brand={brand}
          translatedText={translatedText}
        />
        <section
          className={`${styles.home} home signin ${styles.pos_re}`}
          data-overlay-dark={8}
          id=""
        >
          <div className="container">
            <div className="flex">
              <LeftImage image={"home_img7"} width={600} height={949} />
              <div className="flex-[1_0_0%]">
                <h2>{translatedText.change_password}</h2>
                {/* <h4>user name: {username}</h4> */}
                <br />
                <form className="form" id="contact-form">
                  {changePwdFields.map((field: any, index: any) => {
                    return (
                      <>
                        <FormRenderer
                          translatedText={translatedText}
                          errors={errors}
                          handleBlur={handleBlur}
                          isShow={isShowPwd}
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
                  <div className="inputfield-container" onClick={onClickSubmit}>
                    {/* <div className="errortext">Invalid password.</div> */}
                    {errMsg && (
                      <div className="errortext">
                        {translatedText.passwords_do_not_match}
                      </div>
                    )}
                    <div className="butn-container">
                      <a className={`${styles.butn} butn`} id="submit-signup">
                        <span>{translatedText.continue}</span>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section
          className={`${cPStyles.copyright} ${cPStyles.pos_re}`}
          id="sec4"
        >
          <Footer brand={brand} />
        </section>
      </div>
    );
  }
};

export default EraChangePasswordTemplate;
