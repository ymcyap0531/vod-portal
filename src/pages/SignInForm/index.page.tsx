import React, { useEffect, useMemo, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { setCookie } from "nookies";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";

import { TemplateProps } from "./types";
import { useStore } from "../../utils/userManager";
import { BrandConfigs, Brands, TextTranslations } from "../../types";
import { getBrand, getTemplate } from "../../utils/filter";
import dynamic from "next/dynamic";

export interface Inputs {
  password: string;
  email:    string;
  mobile:   string;
  pincode:  string;
}

export interface SignInFormProps {
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
  brandConfDetails: any;
  domain: string;
  hostNameClean: string;
}
export interface PhoneInfo {
  phoneLength: number;
  phonePrefix: number;
  phoneRegex:  RegExp;
}

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

const templatesWithMobileSignIn = ['alltimeflix'];
const demoUserAllTimeFlix = '96587654321';
const demoPinAllTimeFlix  = '4321';

let Template: React.ComponentType<TemplateProps> | null = null;

const SignInForm = ({ brands, hostName, textTranslation, brandConfigs, brandConfDetails, domain, hostNameClean }: SignInFormProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand    = getBrand(brands, hostName, brandConfigs);

  const lpId        = brandConfDetails[0]?.attributes?.lpId;
  const partnerId   = brandConfDetails[0]?.attributes?.partnerId;
  const partnerApi  = brandConfDetails[0]?.attributes?.partner_api_url;
  const phoneInfo: PhoneInfo = {
    phoneLength: brandConfDetails[0]?.attributes?.phone_details?.phoneLength,
    phonePrefix: brandConfDetails[0]?.attributes?.phone_details?.phonePrefix,
    phoneRegex:  brandConfDetails[0]?.attributes?.phone_details?.phoneRegex,
  }

  useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/SignInForm`)
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const [password, setPassword] = useState<string>("");
  const [mobile, setMobile]     = useState<string>("");
  const [pincode, setPincode]   = useState<string>("");
  const [errMsg, setErrMsg]     = useState(false);
  const { setUsername, setId, setEmail, email } = useStore();
  const { register, handleSubmit, setError, formState, clearErrors, setValue } = useForm<Inputs>();
  const { errors }          = formState;
  const [isShow, setIsShow] = useState(false);
  const { t }               = useTranslation();
  const translatedText      = JSON.parse(textTranslation.data[0].attributes.text);
  const [showPinCodeInput, setShowPinCodeInput]   = useState(false);
  const [isLoading, setIsLoading]                 = useState(false);
  const [isDemoAllTimeFlix, setIsDemoAllTimeFlix] = useState(false);

  useEffect(() => {
    setIsDemoAllTimeFlix(['demo.alltimeflix.com', 'demo.localhost'].includes(window.location.hostname));
  }, []);

  if (!templatesWithMobileSignIn.includes(template)) {
    const handleIcon = () => {
      setIsShow(!isShow);
    };

    const loginUser = async (loginInfo: any, emailId: any) => {
      const userDetails = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users?filters[email][$eq]=${emailId}`,
        {
          headers: myHeaders,
        }
      );

      if (userDetails.data.length === 0) {
        setError("email", {
          type: "onSubmit",
          message: `${translatedText.account_not_found} support@${brand.attributes.domainName}`,
        });
      } else {
        clearErrors("email");
      }

      if (
        userDetails.data[0]?.domain === brand.attributes.domainName ||
        userDetails.data[0]?.domain === null
      ) {
        try {
          clearErrors("password");
          clearErrors("email");
          const login = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/local/`,
            loginInfo
          );
          setEmail(login.data.user.email);
          setUsername(login.data.user.username);
          setId(login.data.user.id);

          if (!login.data.user.blocked) {
            setCookie(null, "jwt", login.data.jwt, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
          }
          setErrMsg(false);

          Router.push("/Portal/?page=1");
        } catch (err) {
          // setErrMsg(true);
          console.log(err);
          setError("password", {
            type: "onSubmit",
            message: `${translatedText.incorrect_password}`,
          });
        }
      } else {
        // setErrMsg(true);
        setError("email", {
          type: "onSubmit",
          message: `${translatedText.account_not_found} support@${brand.attributes.domainName}`,
        });
      }
    };

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
      const loginInfo = {
        identifier: data.email,
        password: data.password,
      };

      loginUser(loginInfo, data.email);
    };

    if (typeof window !== "undefined") {
      const pwdVal = (document.getElementById("password") as HTMLInputElement)
        ?.value;
      const emailVal = (document.getElementById("email") as HTMLInputElement)
        ?.value;

      setValue("password", pwdVal);
      setValue("email", emailVal);
    }

    if (Template) {
      return (
        <Template
          translatedText={translatedText}
          register={register}
          setEmail={setEmail}
          email={email}
          onClickSubmit={handleSubmit(onSubmit)}
          errors={errors}
          isShow={isShow}
          handleIcon={handleIcon}
          brand={brand}
          setPassword={setPassword}
          password={password}
          errMsg={errMsg}
        />
      );
    }
  } else {
    const loginUserWithMobile = async (loginInfo: any) => {
      if(isDemoAllTimeFlix){
        if(loginInfo.mobile === demoUserAllTimeFlix){
          setShowPinCodeInput(true);
        }
      } else {
        try {
          await checkSubscription(loginInfo.mobile);    // #1 Check Subscription
          const isUserInDB = await userExists("email", loginInfo.identifier);  // #1.1 Check if user exists in db
          if(!isUserInDB){
            await createUser(loginInfo.mobile, domain, hostNameClean); // #1.2 Create user
          }
          const hashCode = await registerView();        // #2 Register View
          await subscribe(hashCode, loginInfo.mobile);  // #3 Subscribe
  
          setShowPinCodeInput(true);
        } catch (error: any) {
          console.error(error);
          setError("mobile", {
            type: "onSubmit",
            message: `${translatedText.incorrect_mobile}`,
          });
        }
      }
    };
  
    const userExists = async (name: string, value: string) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users?filters[${name}][$eq]=${value}`,
        { headers: myHeaders }
      );

      return data[0]?.email === value;
    };

    const createUser = async (mobile: string, domain: string, hostNameClean: string) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          email:      `${mobile}@${domain}.com`,
          username:   mobile,
          password:   mobile,
          domain:     hostNameClean,
          orderId:    mobile,
          confirmed:  true
      },
        { headers: myHeaders }
      );

      return data;
    }

    const checkSubscription = async (mobile: string) => {
      const apiCode         = 'subscriptioncheck';
      const apiSubCheckUrl  = brandConfDetails[0]?.attributes?.api_sub_check_url;
      const validateSubscriptionRes = await axios.get(apiSubCheckUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          apiCode:  apiCode,
          msisdn:   mobile,
        }
      });
    
      if (validateSubscriptionRes.data === "" || typeof validateSubscriptionRes.data === "undefined") {
        throw new Error(`${translatedText.no_subscription_mobile}`);
      }
    
      return validateSubscriptionRes.data;
    };
    
    const registerView = async () => {
      let hashCode;
      const registerViewData = {
        lpId:       lpId,
        partnerId:  partnerId,
        requestData: {},
        partnerApi: partnerApi
      };

      const registerViewRes = await axios.post('/api/partner/registerView',
        registerViewData,
        { headers: { 'Content-Type': 'application/json', } }
      );
    
      if (registerViewRes.data.status === 1) {
        hashCode = registerViewRes.data.hashCode;
        localStorage.setItem('hashCode', hashCode);
      } else {
        throw new Error("Error while registering");
      }
    
      return hashCode;
    };
    
    const subscribe = async (hashCode: string, mobile: string) => {
      const subscribeRes = await axios.post('/api/partner/subscribe', {
        "hashCode":     hashCode,
        "msisdn":       `00${mobile}`,
        "operatorCode": 0,
        "partnerApi":   partnerApi
      });
    
      if (subscribeRes.data.status !== 1) {
        throw new Error("Error while subscribing");
      }
    };
    
    const submitPinCode = async (loginInfo: any) => {
      if(isDemoAllTimeFlix){
        if(loginInfo.pincode === demoPinAllTimeFlix){
          handleLogin(loginInfo);
        } else{
          setError("pincode", {
            type: "onSubmit",
            message: `Incorrect Pincode`,
          });
        }
      } else {
        const savedHashCode = localStorage.getItem('hashCode');
        try {
          let pincodeInput = loginInfo.pincode;
          const pincodeRes = await axios.post('api/partner/submitPinCode', {
            "hashCode": savedHashCode,
            "pinCode":  pincodeInput,
            "partnerApi": partnerApi
          });
      
          if (pincodeRes.data.status === 0) {
            setError("pincode", {
              type: "onSubmit",
              message: pincodeRes?.data?.statusMessage ?? `Incorrect Pincode`,
            });
          } else {
            handleLogin(loginInfo);
          }
        } catch (error) {
          console.error('Error during pincode submission:', error);
        }
      }
    };
    
    //Strapi Authentication
    const handleLogin = async (loginInfo: any) => {
      try {
        const login = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local/`,
          loginInfo
        );
        if(login.data?.user?.domain !== window.location.hostname){
          setError("mobile", {
            type: "onSubmit",
            message: `Account not active`,
          });
        } else{
          setIsLoading(true);
          setEmail(login.data.user.email);
          setUsername(login.data.user.username);
          setId(login.data.user.id);
      
          if (!login.data.user.blocked) {
            setCookie(null, "jwt", login.data.jwt, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
          }
          setErrMsg(false);
      
          Router.push("/Portal/?page=1");
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
      const loginInfo = {
        identifier: data.email.toLowerCase(),
        password:   data.password.length === phoneInfo?.phoneLength ? `${phoneInfo?.phonePrefix}${data.password}` : data.password,
        mobile:     data.mobile.length   === phoneInfo?.phoneLength ? `${phoneInfo?.phonePrefix}${data.mobile}` : `${data.mobile}`,
        pincode:    data.pincode,
      };

      if (!showPinCodeInput) {
        loginUserWithMobile(loginInfo);
      } else {
        try {
          submitPinCode(loginInfo);
        } catch (error) {
          console.error('Error during pincode submission:', error);
          setError("pincode", {
            type: "onSubmit",
            message: `Error during pincode submission`,
          });
        }
      }
    };
  
    if (typeof window !== "undefined") {
      setValue("email",     email);
      setValue("password",  mobile);
      setValue("mobile",    mobile);
      setValue("pincode",   pincode);
    }
  
    if (Template) {
      return (
        <Template
          translatedText={translatedText}
          register={register}
          onClickSubmit={handleSubmit(onSubmit)}
          errors={errors}
          brand={brand}
          setMobile={setMobile}
          mobile={mobile}
          setPincode={setPincode}
          pincode={pincode}
          setEmail={setEmail}
          email={email}
          errMsg={errMsg}
          clearErrors={clearErrors}
          showPinCodeInput={showPinCodeInput}
          phoneInfo={phoneInfo}
          isLoading={isLoading}
        />
      );
    }
  }
  return null;
};

export default SignInForm;

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const { req } = _ctx;
  let hostName;
  if (req) {
    hostName = req.headers.host;
  }

  const brandRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brands/`,
    {
      headers: myHeaders,
    }
  );

  const textTranslationRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/text-translations`,
    {
      headers: myHeaders,
    }
  );

  const brandConfigsRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-configs`,
    {
      headers: myHeaders,
    }
  );
  // @ts-ignore
  const hostNameClean = hostName.replace("www.", "");
  const baseHostName  = hostNameClean.split(".");
  const subdomain     = baseHostName[0];
  const domain        = "classidel.com"//baseHostName[1]?.startsWith("localhost") 
      //? `${process.env.NEXT_PUBLIC_LOCAL_DOMAIN}`.split(".")[0]
      //: baseHostName[1];

      const brandConfigsDetailsRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-configs?populate=*&filters[country_code][$eq]=${subdomain}&filters[brand][template][$eq]=${domain}`,
    {
      headers: myHeaders,
    }
  );

  return {
    props: {
      brands:           brandRes.data,
      hostName:         hostName,
      textTranslation:  textTranslationRes.data,
      brandConfigs:     brandConfigsRes.data?.data,
      brandConfDetails: brandConfigsDetailsRes.data?.data,
      domain:           domain,
      hostNameClean:    hostNameClean,
    },
  };
};