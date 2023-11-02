import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import qs from "qs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useStore } from "../../utils/userManager";
import { GetServerSideProps } from "next";
import { TemplateProps } from "./types";
import {
  generateFormElements,
  getBrand,
  getTemplate,
} from "../../utils/filter";
import dynamic from "next/dynamic";
import { BrandConfigs, Brands, TextTranslations } from "../../types";
import { schemas } from "../../utils/YupSchema/SignUpFormSchema";
import { setDefaultResultOrder } from "dns";
import { hostname } from "os";

// export interface Inputs {
//   username: string;
//   password: string;
//   email: string;
// }
const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};
let Template: React.ComponentType<TemplateProps> | null = null;

export interface SignUpFormProps {
  // trial: { days: number; amount: number };
  // membership: { days: number; amount: number };
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
  brandConfDetails?: any
}
const SignUpForm = ({
  // trial,
  // membership,
  hostName,
  brands,
  textTranslation,
  brandConfigs,
  brandConfDetails
}: SignUpFormProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const translatedText = JSON.parse(textTranslation?.data[0].attributes.text);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email_address: "",
    password: "",
  });
  const [isShow, setIsShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const {
    setUsername,
    setEmail,
    email,
    setDomain,
    setOrderId,
    setPaymentToken,
    setFirstName,
    setCampaignId,
    campaignId,
    setProductId,
    setProductInternal,
    pwd,
    setPwd,
  } = useStore();

  const final_schema = schemas.default_schema.schema;
  const final_settings = schemas.default_schema.settings;
  const [subscription, setSubscription] = useState<string>("");
  const [subClick, setSubClick] = useState<boolean>(false);
  const [initPaymentErr, setInitPaymentErr] = useState<string>("");
  const [isEmailExist, setIsEmailExist] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(final_schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
      email_address: "",
      password: "",
    },
  });
  const { errors } = formState;
  const values = useWatch({ control });

  const signUpFormFields = useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/SignUpForm`)
      );

      return generateFormElements(
        ["firstname", "lastname", "email_address", "password", "checkbox1"],
        register,
        final_settings
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIcon = () => {
    setIsShow(!isShow);
  };

  const onSubmit = async (userDetails: any) => {
    if (isEmailExist) {
      setError("email_address", {
        type: "onSubmit",
        message: translatedText.email_exists,
      });
    } else {
      clearErrors("email_address");
    }
    setSubClick(true);
    const username = userData.firstname + " " + userData.lastname;
    setFirstName(userData.firstname);
    setUsername(username);
    setEmail(userData.email_address.toLowerCase());
    setDomain(brand.attributes.domainName);
    setPwd(userData.password);

    if (subscription !== "") {
      const data = qs.stringify({
        firstName: userData.firstname,
        lastName: userData.lastname,
        emailAddress: userDetails.email_address.toLowerCase(),
        campaignId: campaignId,
        referer: location.host,
      });

      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/payment/initPayment/`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: location.host,
        },
        data: data,
      };
      if (!isEmailExist) {
        axios(config)
          .then((res) => {
            setLoader(true);
            if (res.data.status === "OK") {
              setOrderId(res.data.orderId);
              setPaymentToken(res.data.paymentToken);
              setInitPaymentErr("");
              Router.push({
                pathname: "/Payment",
                query: { subscription: subscription },
              });
            } else {
              setInitPaymentErr(res.data.status);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }
  };

  const userExists = async (name: string, value: string) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users?filters[${name}][$eq]=${value}`,
      { headers: myHeaders }
    );
    if (name === "email") {
      if (data[0]?.email === value) {
        setIsEmailExist(true);
      } else {
        setIsEmailExist(false);
      }
    }
  };

  const onValueChange = (e: any) => {
    setValue(e.target.name, e.target.value);
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    yup
      .reach(final_schema, name)
      .validate(value)
      .then((res: any) => {
        clearErrors(name);
      })
      .catch((err: any) => {
        setError(name, {
          type: "onBlur",
          message: `${translatedText[`minimum_length_${name}`]}`,
        });
      });

    setUserData({ ...userData, [name]: value });
    if (e.target.name === "email_address") {
      userExists("email", value.toLowerCase());
    }
    setValue(e.target.name, e.target.value);
  };

  const handleClick = (e: any) => {
    setSubscription(e.target.name);
    setProductInternal(1);
      if (e.target.name === "trial") {
        setCampaignId(brand.attributes.trial.campaign_id);
        setProductId(brand.attributes.trial.product_id);
      } else if(e.target.name === "Fallback" && brand.attributes.fallback){
        setCampaignId(brand.attributes.fallback.campaign_id);
        setProductId(brand.attributes.fallback.product_id);
      } else{
        setCampaignId(brand.attributes.membership.campaign_id);
        setProductId(brand.attributes.membership.product_id);
      }
  };

  const onErrors = (err: any) => {
    console.log(err);
  };

  if (Template) {
    return (
      <Template
        subscription={subscription}
        handleClick={handleClick}
        trial={brand.attributes.trial}
        membership={brand.attributes.membership}
        fallback={brand.attributes?.fallback}
        translatedText={translatedText}
        register={register}
        onClickSubmit={handleSubmit(onSubmit, onErrors)}
        errors={errors}
        handleBlur={handleBlur}
        isShow={isShow}
        handleIcon={handleIcon}
        brand={brand}
        subClick={subClick}
        values={values}
        initPaymentErr={initPaymentErr}
        isEmailExist={isEmailExist}
        loader={loader}
        signUpFormFields={signUpFormFields}
        onValueChange={onValueChange}
        brandConfDetails={brandConfDetails}
      />
    );
  }
  return null;
};

export default SignUpForm;

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
  const baseHostName  = hostName.replace("www.", "")?.split(".");
  const subdomain     = baseHostName[0];
  const domain        = baseHostName[1]?.startsWith("localhost") 
      ? `${process.env.NEXT_PUBLIC_LOCAL_DOMAIN}`.split(".")[0]
      : baseHostName[1];

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
      brandConfDetails: brandConfigsDetailsRes.data?.data
    },
  };
};
