import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Router from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

import { useStore } from "../utils/userManager";
import axios from "axios";
import Modal from "./Modal";
import Loader from "./Loader";

const ContactForm = ({
  setUserEmail,
  brand,
  translatedText,
  styles,
  image,
}: any) => {
  const {
    email,
    setEmail,
    isValid,
    isBlocked,
    setIsValid,
    orderId,
    setUserId,
    userId,
    setIsBlocked,
    setOrderId,
    id,
  } = useStore();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [otherInquiries, setOtherInquiries] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleChange = (e: any) => {
    if (e.target.value === "othersubject") {
      setOtherInquiries(true);
    } else {
      setOtherInquiries(false);
    }
  };

  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };

  const onChange = (e: any) => {
    setEmail(e.target.value.toLowerCase());
  };

  const fetchUser = async (email: string) => {
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users?filters[email][$eq]=${email}`,
      {
        headers: myHeaders,
      }
    );
    if (userRes.data.length !== 0) {
      setOrderId(userRes.data[0].orderId);
      setUserId(userRes.data[0].id);
      setIsBlocked(userRes.data[0].blocked);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  useEffect(() => {
    fetchUser(email);
  }, [email]);

  const saveSupportForm = async (
    subject: string,
    message: string,
    email: string,
    emailFound: boolean,
    cancelled: boolean,
    formType: any,
    userId: number | null
  ) => {
    const supportFormRes = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/support-forms`, {
        data: {
          subject: subject,
          message: message,
          email: email,
          emailFound: emailFound,
          cancelled: cancelled,
          formType: formType,
          userId: userId,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const blockUser = async () => {
    const userRes = await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        { blocked: true },
        {
          headers: myHeaders,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data: any) => {
    setUserEmail(data.email.toLowerCase());
    fetchUser(data.email.toLowerCase());
    const cancelBody = JSON.stringify({
      orderId: orderId,
      cancelReason: data.text,
    });

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/payment/cancelOrder/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: cancelBody,
    };

    //check if captcha is verified
    if (isCaptchaVerified) {
      setLoader(true);
      if (otherInquiries) {
        //other inquiries
        try {
          const res = await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/email/`, {
              to: brand.attributes.supportEmail,
              subject: data.subject,
              text: `${data.text} \nemail: ${data.email.toLowerCase()}`,
            })
            .then((res) => {
              Router.push({
                pathname: "/OtherInquiries",
              });
              console.log("other", res);
            });

          saveSupportForm(
            data.subject,
            data.text,
            data.email,
            isValid,
            false,
            1,
            isValid ? userId : null
          );
        } catch (err: any) {
          console.error(err);
        }
      } else {
        // cancel membership
        if (isValid && !isBlocked) {
          axios(config)
            .then((res) => {
              Router.push({
                pathname: "/CancelMembership",
                query: { email: data.email.toLowerCase() },
              });
              setErrMsg("");
              saveSupportForm(
                "CANCEL MEMBERSHIP REQUEST",
                data.text,
                data.email,
                isValid,
                true,
                2,
                isValid ? userId : null
              );
              blockUser();
            })
            .catch((err) => {
              setErrMsg(
                "Something went wrong, your subscription is not cancelled"
              );
              console.log("err", err);
            });
        } else {
          Router.push({
            pathname: "/CancelMembership",
            query: { email: data.email.toLowerCase() },
          });
          saveSupportForm(
            "CANCEL MEMBERSHIP REQUEST",
            data.text,
            data.email,
            isValid,
            false,
            2,
            isValid ? userId : null
          );
        }
      }
    } else {
      setOpen(!open);
    }
  };

  const handleOnChange = (value: any) => {
    setIsCaptchaVerified(!isCaptchaVerified);
  };

  return (
    <section
      className={`contactform ${styles.home}  ${styles.pos_re}`}
      data-overlay-dark={8}
      id="contactform"
    >
      <div className="container">
        <div className="flex">
          <div className="home_img flex-[1_0_0%]">
            <Image
              width={360}
              height={570}
              src={`/images/${image}.png`}
              alt="home_image"
            />
          </div>
          <div className="flex-[1_0_0%]">
            <h2 className={styles.text_primary_color}>
              {translatedText.contact_form}
            </h2>
            <br />
            <br />
            <form className="form" id="contact-form">
              <div className="inputfield-container">
                <h5>{translatedText.choose_your_subject}</h5>
                <select
                  className="dropdown-form-selector selectSubject text-black"
                  onChange={handleChange}
                >
                  <option value="cancelmember">
                    {translatedText.cancel_membership}
                  </option>
                  <option value="othersubject">
                    {translatedText.other_inquiries}
                  </option>
                </select>
              </div>
              <br />
              {otherInquiries && (
                <div className="inputfield-container">
                  <input
                    type="text"
                    {...register("subject", {
                      required: true,
                    })}
                    className="inputfield"
                    name="subject"
                    placeholder={translatedText.placeholder_subject}
                  />
                  {errors.subject && (
                    <div className="errortext error-email">
                      {translatedText.please_specify_your_subject}
                    </div>
                  )}
                </div>
              )}
              <br />
              <div className="inputfield-container">
                <textarea
                  rows={0}
                  cols={0}
                  {...register("text", {
                    required: true,
                  })}
                  name="text"
                  className="inputtext"
                  id="message"
                  placeholder={translatedText.placeholder_your_message}
                  defaultValue={""}
                />
                {errors.text && (
                  <div className="errortext error-message">
                    {translatedText.please_type_your_message}
                  </div>
                )}
              </div>
              <br />
              <div className="inputfield-container">
                <input
                  type="email"
                  value={email ? email : ""}
                  {...register("email", {
                    required: true,
                    maxLength: 50,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  className="inputfield"
                  id="email"
                  placeholder={translatedText.placeholder_email_address}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className="errortext error-email">
                    {translatedText.please_fill_your_valid_email}
                  </div>
                )}
              </div>
              <br />
              <div className="inputfield-container">
                <div
                  className="g-recaptcha brochure__form__captcha"
                  data-sitekey="YOUR SITE KEY"
                />
                <ReCAPTCHA
                  sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                  onChange={handleOnChange}
                />
                <Modal
                  open={open}
                  handleOpen={handleOpen}
                  translatedText={translatedText}
                />
              </div>
              <br />
              {errMsg !== "" && (
                <div className="errortext error-email">{errMsg}</div>
              )}
              <button
                className="inputfield-container"
                onClick={handleSubmit(onSubmit)}
                disabled={loader}
              >
                <Loader
                  loader={loader}
                  translatedText={translatedText.send}
                  styles={styles}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
