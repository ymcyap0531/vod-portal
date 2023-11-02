import React, { useMemo, useState } from "react";
import Router, { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { Articles, BrandConfigs, Brands, TextTranslations } from "../../types";
import { TemplateProps } from "./types";
import {
  generateFormElements,
  getBrand,
  getTemplate,
  wrapTags,
} from "../../utils/filter";
import dynamic from "next/dynamic";
import axios from "axios";
import { useStore } from "../../utils/userManager";
import qs from "qs";
import { schemas } from "../../utils/YupSchema/PaymentSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export interface PaymentProps {
  // trial: { days: number; amount: number };
  // membership: { days: number; amount: number };
  brands: Brands;
  hostName: string;
  articleTrial: Articles;
  articleMonth: Articles;
  textTranslation: TextTranslations;
  brandConfigs: BrandConfigs;
}
const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};
let Template: React.ComponentType<TemplateProps> | null = null;

const Payment = ({
  // trial,
  // membership,
  brands,
  hostName,
  articleTrial,
  articleMonth,
  textTranslation,
  brandConfigs
}: PaymentProps) => {
  const { t } = useTranslation();
  const template = getTemplate(brands, hostName, brandConfigs);
  const brand = getBrand(brands, hostName, brandConfigs);
  const {
    username,
    email,
    domain,
    orderId,
    paymentToken,
    firstName,
    campaignId,
    productId,
    productInternal,
    pwd,
  } = useStore();
  const [paymentErr, setPaymentErr] = useState<string>("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();
  const subscription = router.query.subscription?.toString();

  const paymentTerms = wrapTags(articleTrial.data[0]?.attributes.content, {
    support_email: `${brand.attributes.supportEmail}`,
    trial_amount: brand.attributes.trial.amount,
    trial_days: brand.attributes.trial.days,
    membership_days: brand.attributes.membership.days,
    membership_amount: brand.attributes.membership.amount,
    fallback_days: brand.attributes.fallback?.days,
    fallback_amount: brand.attributes.fallback?.amount,
    currency: brand.attributes.membership.currency
  });

  const paymentMonthTerms = wrapTags(articleMonth.data[0]?.attributes.content, {
    support_email: `${brand.attributes.supportEmail}`,
    trial_amount: brand.attributes.trial.amount,
    trial_days: brand.attributes.trial.days,
    membership_days: brand.attributes.membership.days,
    membership_amount: brand.attributes.membership.amount,
    fallback_days: brand.attributes.fallback?.days,
    fallback_amount: brand.attributes.fallback?.amount,
    currency: brand.attributes.trial.currency
  });

  const transactionDisplay = wrapTags(
    t("transaction_will_appear_on_your_cardholder_statement_as"),
    {
      support_number: `${brand.attributes.supportNumber}`,
      domain: `${brand.attributes.domainName}`,
    }
  );

  const final_schema = schemas.default_schema.schema;
  const final_settings = schemas.default_schema.settings;
  const {
    register,
    handleSubmit,
    setError,
    formState,
    clearErrors,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(final_schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      fullname: "",
      cardnumber: "",
      month: "",
      year: "",
      cvc: "",
      zipcode: "",
      checkbox1: false,
      checkbox2: false,
    },
  });
  const { errors } = formState;
  const values = useWatch({ control });
  const translatedText = JSON.parse(textTranslation.data[0].attributes.text);

  const paymentFields = useMemo(() => {
    if (template) {
      Template = dynamic(() => import(`../../templates/${template}/Payment`));

      return generateFormElements(
        [
          "fullname",
          "cardnumber",
          [{ item: "month" }, { item: "year" }, { item: "cvc" }],
          "zipcode",
          "checkbox1",
          "checkbox2",
        ],
        register,
        final_settings
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateCard = (cardNumber: any) => {
    const data = qs.stringify({
      card_number: cardNumber,
    });

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/payment/validateCreditcard/?card_number=`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config).then((res) => {
      if (res.data) {
        clearErrors("cardnumber");
      } else {
        setError("cardnumber", {
          type: "string",
          message: "Invalid card number",
        });
      }
    });
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    if (name === "cardnumber") {
      validateCard(value);
    }
    yup
      .reach(final_schema, name)
      .validate(value)
      .then((res: any) => {
        clearErrors(name);
      })
      .catch((err: any) => {
        console.log(err);
        setError(name, {
          type: "onBlur",
          message: `${translatedText[`error_${name}`]}`,
        });
      });

    setValue(name, value);
  };

  const onValueChange = (e: any) => {
    setValue(e.target.name, e.target.value);
  };

  const onSubmit = async (formData: any) => {
    const data = qs.stringify({
      cardMonth: formData.month,
      cardYear: formData.year,
      cardSecurityCode: formData.cvc,
      cardNumber: formData.cardnumber,
      product: {
        productInternal: productInternal,
        productId: productId,
      },
      orderId: orderId,
      paymentToken: paymentToken,
      campaignId: campaignId,
      email: email,
      domain: brand.attributes.domainName,
      name: brand.attributes.name,
      firstName: firstName,
      password: pwd,
      supportNumber: brand.attributes.supportNumber,
      portal_api_type: 1,
    });

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/payment/completePayment/`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: location.host,
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        setLoader(true);
        if (res.data.status === "OK") {
          setPaymentErr("");
          Router.push("/ThankYou");
        } else {
          setPaymentErr(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onErrors = (err: any) => {
    console.log(err);
  };

  if (Template) {
    return (
      <Template
        trial={brand.attributes.trial}
        membership={brand.attributes.membership}
        fallback={brand.attributes?.fallback}
        register={register}
        onClickSubmit={handleSubmit(onSubmit, onErrors)}
        errors={errors}
        brand={brand}
        translatedText={translatedText}
        paymentTerms={paymentTerms}
        transactionDisplay={transactionDisplay.replace(" +1", "")}
        subscription={subscription}
        paymentMonthTerms={paymentMonthTerms}
        validateCard={validateCard}
        paymentErr={paymentErr}
        loader={loader}
        paymentFields={paymentFields}
        handleBlur={handleBlur}
        onValueChange={onValueChange}
      />
    );
  }
  return null;
};

export default Payment;

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

  const articleTrialRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=paymentTerms`,
    {
      headers: myHeaders,
    }
  );

  const articleMonthRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/?filters[name][$eq]=paymentMonthTerms`,
    {
      headers: myHeaders,
    }
  );

  // const trial = { days: 2, amount: 1 };
  // const membership = { days: 14, amount: 29.99 };

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
      // trial: trial,
      // membership: membership,
      brands: brandRes.data,
      hostName: hostName,
      articleTrial: articleTrialRes.data,
      articleMonth: articleMonthRes.data,
      textTranslation: textTranslationRes.data,
      brandConfigs: brandConfigsRes.data?.data
    },
  };
};
