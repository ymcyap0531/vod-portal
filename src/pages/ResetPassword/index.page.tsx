import React, { useMemo, useState } from "react";
import Router, { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import * as yup from "yup";

import { TemplateProps } from "./types";
import { BrandConfigs, Brands, TextTranslations } from "../../types";
import {
  generateFormElements,
  getBrand,
  getTemplate,
} from "../../utils/filter";
import { schemas } from "../../utils/YupSchema/ResetPasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export interface Inputs {
  password: string;
  passwordConfirmation: string;
}
export interface ResetPasswordProps {
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
}
const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};
let Template: React.ComponentType<TemplateProps> | null = null;

const ResetPassword = ({
  brands,
  hostName,
  textTranslation,
  brandConfigs
}: ResetPasswordProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const { query } = useRouter();
  const code = query.code;
  const { t } = useTranslation();
  const [pwd, setPwd] = useState({ password: "", passwordConfirmation: "" });
  const [isMatch, setIsMatch] = useState(true);
  const final_schema = schemas.default_schema.schema;
  const final_settings = schemas.default_schema.settings;
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
      password: "",
      passwordConfirmation: "",
    },
  });
  const { errors } = formState;
  const values = useWatch({ control });
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [isShowPwdConf, setIsShowPwdConf] = useState(false);
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);

  const resetPwdFields = useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/ResetPassword`)
      );

      return generateFormElements(
        ["password", "passwordConfirmation"],
        register,
        final_settings
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: any) => {
    if (pwd.password === pwd.passwordConfirmation) {
      setIsMatch(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          code: code,
        })
        .then((response) => {
          // Handle success.
          Router.push("/SignInForm");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    } else {
      setIsMatch(false);
    }
  };

  const handleChange = (e: any) => {
    setValue(e.target.name, e.target.value);
    setPwd({ ...pwd, [e.target.name]: e.target.value });
  };

  const handleIcon = (e: any) => {
    setIsShowPwd(!isShowPwd);
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
          message: `${translatedText[`error_${name}`]}`,
        });
      });
    setValue(e.target.name, e.target.value);
  };

  if (Template) {
    return (
      <Template
        register={register}
        onClickSubmit={handleSubmit(onSubmit)}
        errors={errors}
        brand={brand}
        isShowPwd={isShowPwd}
        pwd={pwd}
        handleChange={handleChange}
        handleIcon={handleIcon}
        isShowPwdConf={isShowPwdConf}
        isMatch={isMatch}
        translatedText={translatedText}
        resetPwdFields={resetPwdFields}
        handleBlur={handleBlur}
        setIsShowPwdConf={setIsShowPwdConf}
      />
    );
  }
  return null;
};

export default ResetPassword;

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
  return {
    props: {
      brands: brandRes.data,
      hostName: hostName,
      textTranslation: textTranslationRes.data,
      brandConfigs: brandConfigsRes.data?.data
    },
  };
};
