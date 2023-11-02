import React from "react";
import { useTranslation } from "react-i18next";

const Other = () => {
  const { t } = useTranslation();

  return <div>{t("other_inquiries_message")}</div>;
};

export default Other;
