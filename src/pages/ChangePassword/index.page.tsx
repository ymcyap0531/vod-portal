import React, { useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useForm, useWatch } from "react-hook-form";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { requireAuthentication } from "../../RequireAuthentication";
import { TemplateProps } from "./types";
import { BrandConfigs, Brands, TextTranslations } from "../../types";
import {
  generateFormElements,
  getBrand,
  getTemplate,
} from "../../utils/filter";
import dynamic from "next/dynamic";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../../utils/YupSchema/ResetPasswordSchema";

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

export interface ChangePasswordProps {
  brands: Brands;
  hostName: string;
  textTranslation: TextTranslations;
  token: string;
  brandConfigs:     BrandConfigs;
}

let Template: React.ComponentType<TemplateProps> | null = null;
const ChangePassword = ({
  brands,
  hostName,
  textTranslation,
  token,
  brandConfigs
}: ChangePasswordProps) => {
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const myAuthHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  };

  const { t } = useTranslation();
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);
  const router = useRouter();
  const { id } = router.query;
  const [errMsg, setErrMsg] = useState(false);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [isShowPwdConf, setIsShowPwdConf] = useState(false);
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

  const changePwdFields = useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/ChangePassword`)
      );

      return generateFormElements(
        ["password", "passwordConfirmation"],
        register,
        final_settings
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [CPApiError, setCPApiError] = useState(false);

  const onSubmit = async (data: any) => {
    const pwd = {
      password: data.password,
    };
    if (data.password === data.passwordConfirmation) {
      setErrMsg(false);

      const res = axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, pwd, {
          headers: myAuthHeaders,
        })
        .then(() => {
          Router.push("/SignInForm");
        })
        .catch((err) => {
          {
            setCPApiError(err.response.status);
          }
        });
    } else {
      setCPApiError(false);
      setErrMsg(true);
    }
  };

  const handleChange = (e: any) => {
    setValue(e.target.name, e.target.value);
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

  const onErrors = (err: any) => {
    console.log("err", err);
  };

  if (Template) {
    return (
      <Template
        translatedText={translatedText}
        register={register}
        onClickSubmit={handleSubmit(onSubmit)}
        errors={errors}
        brand={brand}
        isShowPwd={isShowPwd}
        setIsShowPwd={setIsShowPwd}
        isShowPwdConf={isShowPwdConf}
        setIsShowPwdConf={setIsShowPwdConf}
        errMsg={errMsg}
        handleChange={handleChange}
        handleBlur={handleBlur}
        changePwdFields={changePwdFields}
        handleIcon={handleIcon}
        CPApiError={CPApiError}
      />
    );
  }
  return null;
};

export default ChangePassword;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    const { req } = _ctx;
    const token = req.cookies.jwt;

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
        token: token,
        brandConfigs: brandConfigsRes.data?.data
      },
    };
  }
);
